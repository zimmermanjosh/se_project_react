import "./App.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import { useState, useEffect } from "react";
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
import logger from "../../utils/logger.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import { deleteItems, addItems, getItems, addCardLike, removeCardLike } from "../../utils/api.jsx";
import { register, login, checkToken, updateUserProfile } from "../../utils/auth.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

import { runLoginTests } from '../../utils/test/TestLogin.jsx';

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
  const history = useNavigate();
  const [location, setLocation] = useState('');

  //check for token when web mounts
  // Check for token on mount
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
        // After registration, log the user in automatically
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
        console.log(err);
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

  // User profile handlers
  const handleUpdateUser = ({ name, avatar }) => {
    setIsLoading(true);
    updateUserProfile(name, avatar)  // No need to pass token here anymore
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

// item handlers
  const handleDeleteModal = (card) => {
    deleteItems(card._id)
      .then(() => {
        handleCloseModal();
        const updatedCards = cards.filter((item) => item._id !== card._id);
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
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
      });
    console.log("onAddItem", values);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    isLiked
      ? // if so, send a request to add the user's id to the card's likes array
      addCardLike(id, token)
        .then((updatedCard) => {
          setCards((items) =>
            items.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
      removeCardLike(id, token)
        .then((updatedCard) => {
          setCards((items) =>
            items.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
       // console.log("Weather API data:", data);
        const temperature = parseWeatherData(data);
       // console.log("Parsed temperature:", temperature);
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
                //cards={cards.filter(item => !item.owner || item.owner === currentUser?._id)}
                cards={cards}
                onCardLike={handleCardLike}
              />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer
        />
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
  </CurrentTemperatureUnitContext.Provider>
</CurrentUserContext.Provider>
);
}

export default App;
