
export const conf = {
    "sessionPrefix": "Nabil",
    "endpoints": {
        "get-messages": {
            "path": "messsage/since/:timestamp",
            "isCached": false
        },
        "get-user-messages": {
            "path": "messsage/user/:username",
            "isCached": false
        },
        "create-message": {
            "path": "messsage",
            "isCached": false
        },
        "get-user": {
            "path": "user/:username",
            "isCached": false
        },
        "create-user": {
            "path": "user",
            "isCached": false
        },        

    }
}
