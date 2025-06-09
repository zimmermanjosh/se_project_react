import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import {
  getForecastWeather,
  parseWeatherData,
} from "../../utils/WeatherApi.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.jsx";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import logger from "../../utils/logger.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import { deleteItems, addItems, getItems, addCardLike, removeCardLike } from "../../utils/api.jsx";
import { register, login, checkToken, updateUserProfile } from "../../utils/auth.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

import version from "../../version.jsx";


function App() {
  logger("App");

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const history = useNavigate();
  const [location, setLocation] = useState('');
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  //modal handlers
  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setItemToDelete(null);
    setLoginError(false);
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  logger(selectedCard);

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  //toggle temp yo
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  // Authentication handlers
  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoading(true);
    register({ name, avatar, email, password })
      .then(() => {
        return login({ email, password });
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return checkToken(data.token);
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseModal();
        history("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

const handleLogin = ({ email, password }) => {
  setIsLoading(true);
  setLoginError(false);

  login({ email, password })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      }
    })
    .then((userData) => {
      setCurrentUser(userData);
      setIsLoggedIn(true);
      handleCloseModal();
      history("/");
    })
    .catch((err) => {
      console.log("Login error:", err);
      setLoginError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    history("/");
  };

  const handleUpdateUser = ({ name, avatar }) => {
    setIsLoading(true);
    updateUserProfile(name, avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

const handleDeleteModal = (card) => {
  console.log("🔧 Opening delete confirmation for:", card.name);
  setItemToDelete(card);
  setActiveModal("confirm-delete");
};

  const handleConfirmDelete = () => {
  if (!itemToDelete) return;

  console.log("🔧 Confirming delete for:", itemToDelete.name);

  deleteItems(itemToDelete._id)
    .then(() => {
      console.log("✅ Item deleted successfully");
      handleCloseModal();
      const updatedCards = cards.filter((item) => item._id !== itemToDelete._id);
      setCards(updatedCards);
      setItemToDelete(null);
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    });
};


const onAddItem = (values) => {
  addItems(values)
    .then((res) => {
      setCards((cards) => [res, ...cards]);
      handleCloseModal();
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    });
};

  const handleCardLike = ({ id, isLiked }) => {
  const token = localStorage.getItem("jwt");

  // Check if this card is now liked
  if (isLiked) {
    // Add like
    addCardLike(id, token)
      .then((updatedCard) => {
        setCards((items) =>
          items.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((error) => {
        console.error("Error liking item:", error);
      });
  } else {
    // Remove like
    removeCardLike(id, token)
      .then((updatedCard) => {
        setCards((items) =>
          items.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((error) => {
        console.error("Error removing like:", error);
      });
  }
};

useEffect(() => {
  getForecastWeather()
    .then((data) => {
      const temperature = parseWeatherData(data);
      logger(temperature);
      if (data.name) {
        setLocation(data.name);
      }
      setTemp(temperature);
      return getItems();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        throw new Error("Invalid item data");
      }
      setCards(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, [isLoggedIn]);

  logger(temp);
  logger(currentTemperatureUnit);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          version={version}
          onSignOut={handleSignOut}
          onToggleSwitchChange={handleToggleSwitchChange}
          currentTemperatureUnit={currentTemperatureUnit}
          onCreateModal={handleCreateModal}
          onRegisterModal={handleRegisterModal}
          onLoginModal={handleLoginModal}
          isLoggedIn={isLoggedIn}
          location={location}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherTemp={temp}
                onSelectedCard={handleSelectedCard}
                cards={cards}
                onCardLike={handleCardLike}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                onSelectedCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                onEditProfile={handleEditProfileModal}
                onSignOut={handleSignOut}
                cards={cards}
                onCardLike={handleCardLike}
              />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onCardDelete={handleDeleteModal}
            isOwn={selectedCard.owner === currentUser?._id}
            isLoggedIn={isLoggedIn}
            onCardLike={handleCardLike}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
            onRegisterClick={() => setActiveModal("register")}
            isLoading={isLoading}
            loginError={loginError}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
            onLoginClick={() => setActiveModal("login")}
            isLoading={isLoading}
          />
        )}
        {activeModal === "edit-profile" && (
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
        )}

        {activeModal === "confirm-delete" && (
          <ConfirmDeleteModal
            isOpen={activeModal === "confirm-delete"}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            itemName={itemToDelete?.name}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;