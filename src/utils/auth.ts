import { supabase } from "./setupSupaBase";


export async function getUserSession() {
	const { data, error } = await supabase.auth.getSession()
	if (error) {
		console.log(error)
		throw new Error(error.message)
	}
	return data.session
}

export async function anonSignUp() {
	const { data, error } = await supabase.auth.signInAnonymously();
	if (error) {
		console.log(error)
		throw new Error(error.message)
	}
	console.log(data, error)
	return data.session
}