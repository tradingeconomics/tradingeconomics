class DateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DateError';
    }
}

export {
    DateError
};
