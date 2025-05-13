const routes = {
    root: "/",
    dashboard: "/dashboard",
    authentication: {
        login: "/auth/login",
        register: "/auth/register",
        finish: "/auth/finish",
    },
    api: {
        base: "/api",
        client: {
            login: "/api/auth/login",
            register: "/api/auth/register",
            file: {
                uploadFile: "/api/files/upload",
                uploads: "/api/uploads",
            },
            metadata: {
                all: "/api/metadata/all"
            },
            geolocalization: {
                countries: {
                    all: "/api/geolocalization/country/all",
                    state: "/state/all"
                }
            }
        }
    }
}

export default routes;