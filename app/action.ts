"use server"

export const test =  async () => {
    
    console.log(process.env.AUTH_GOOGLE_ID, "google id");
    console.log(process.env.AUTH_GOOGLE_SECRET, "google id");
    console.log(process.env.MONGO_URI, "google id");
    console.log(process.env.NEXTAUTH_SECRET, "google id");
    console.log(process.env.NEXTAUTH_URL, "google id");


    return {
        "google id" : process.env.AUTH_GOOGLE_ID,
        "secret" : process.env.AUTH_GOOGLE_SECRET,
        "uri" : process.env.MONGO_URI,
        "next": process.env.NEXTAUTH_SECRET,
        "URL":process.env.NEXTAUTH_URL
    }
}


