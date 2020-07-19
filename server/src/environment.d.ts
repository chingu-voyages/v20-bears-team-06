declare global {
    namespace NodeJs {
        interface ProcessEnv {
            APP_ENV: 'development' | 'production',
            NODE_ENV: 'development' | 'production',
            
        }
    }
}

export {}