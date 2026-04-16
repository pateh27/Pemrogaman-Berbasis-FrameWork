import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    addDoc,
    where,
    updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function signIn(
    email: string
) {
    const q = query(collection(db, "members"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data.length > 0 ? data[0] : null;
}

export async function signUp(
    userData: {
        email: string;
        fullname: string;
        password: string;
        role?: string;
    },
    callback: Function,
) {
    if (userData.password.length < 6) {
        callback({
            status: "error",
            message: "Password minimal 6 karakter",
        });
        return;
    }
    const q = query(
        collection(db, "members"),
        where("email", "==", userData.email),
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (data.length > 0) {
        callback({
            status: "error",
            message: "Email sudah terdaftar, gunakan email lain",
        });
    } else {
        try {
            userData.password = await bcrypt.hash(userData.password, 10);
            userData.role = "members";
            await addDoc(collection(db, "members"), userData);
            callback({
                status: "success",
                message: "Member registered successfully",
            });
        } catch (error) {
            callback({
                status: "error",
                message: "User gagal didaftarkan",
            });
        }
    } 
}

export async function signInWithGoogle(userData: any, callback: any ) {
    try {
        const q = query(
            collection(db, "members"),
            where("email", "==", userData.email),
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        if (data.length > 0) {
            userData.role = data[0].role;
            await updateDoc(doc(db, "members", data[0].id), userData);
            callback({
                status: "success",
                message: "Member logged in successfully",
                data: data[0],
            });
        } else {
            userData.role = "members";
            await addDoc(collection(db, "members"), userData);
            callback({
                status: "success",
                message: "User registered and logged in successfully",
                data: userData,
            });
        }
    } catch (error: any) {
        callback({
            status: "error",
            message: "failed to register user with Google",
        });
    }
}