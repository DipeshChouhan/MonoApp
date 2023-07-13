import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { setUser } from "../store/slices/userSlice";
const signOut = (onSuccess, onError) => {
	GoogleSignin.signOut()
		.then(() => {
			auth()
				.signOut()
				.then(() => {
					onSuccess();
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => {
			console.log(err);
		});
};



export { signOut };
