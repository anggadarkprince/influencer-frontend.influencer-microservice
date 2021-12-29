const dev = {
    BASE_URL: 'http://localhost:8000/api',
    CHECKOUT_URL: 'http://localhost:3002',
}

const prod = {
    BASE_URL: '',
    CHECKOUT_URL: ''
}

const values = {
    ...(process.env.NODE_ENV === 'development' ? dev : prod)
}

export default values;