// stupid simple logging function for global on-demand logging

const isLoggingEnabled = false;

const logger = (...args) => {
  if (isLoggingEnabled) {
    console.log(...args);
  }
};

export default logger;
