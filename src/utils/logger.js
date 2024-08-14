// stupid simple logging function for global on-demand logging

const isLoggingEnabled = true;

const log = (...args) => {
    if (isLoggingEnabled) {
        console.log(...args);
    }
};

export default log;