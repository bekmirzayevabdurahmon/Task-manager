import userModel from "./models/user.model.js"

class userService {
    #_userModel;
    constructor() {
        this.#_userModel = userModel;
        this.#_seedUsers()
    }

    getAllUsers = async () => {
        const users = await this.#_userModel.find();

        return {
            message: "success",
            count: users.length,
            data: users,
        };
    };

    #_seedUsers = async () => {
        const defaultUsers = [{ name: "alex" }, {name: "tommy" }];

        for ( let u of defaultUsers) {
            const user = await this.#_userModel.findOne({ name: u.name });

            if(!user) {
                await this.#_userModel.create({ name: u.name });
            }
        }

        console.log("Default userlar yaratildi✅");
    };
};

export default new userService(); 