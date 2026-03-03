class UserState {
	logged_in: boolean = $state(false);
	username: string | undefined = $state();
	email: string | undefined = $state();


	update(local_storage: WindowLocalStorage){
		const logged_in = local_storage.localStorage.getItem("logged_in");
		if (logged_in === null) {
			this.logged_in = false;
		} else {
			this.logged_in = logged_in === "true";
		}
		if(!logged_in) {
			// Stop here since the user is not logged in
			return
		}
		const username = local_storage.localStorage.getItem("username");
		if(username !== null) {
			this.username = username;
		}
		const email = local_storage.localStorage.getItem("email");
		if(email !== null) {
			this.email = email;
		}

	}
	set_logged_in(local_storage: WindowLocalStorage, logged_in: boolean){
		local_storage.localStorage.setItem("logged_in", logged_in.toString());
		this.update(local_storage);
	}
	set_user_data(local_storage: WindowLocalStorage, username: string, email: string){
		local_storage.localStorage.setItem("username", username);
		local_storage.localStorage.setItem("email", email);
		this.update(local_storage);
	}
	clean_local_storage(local_storage: WindowLocalStorage){
		local_storage.localStorage.removeItem("logged_in");
		local_storage.localStorage.removeItem("username");
		local_storage.localStorage.removeItem("email");
		this.update(local_storage);
	}
}

export const user_state = new UserState();
