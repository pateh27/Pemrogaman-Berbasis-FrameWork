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

interface MemberData {
    id: string;
    email: string;
    fullname?: string;
    password?: string;
    role: string;
    [key: string]: any;
}

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

export async function signIn(email: string) {
    const q = query(collection(db, "members"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as MemberData[];
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
    })) as MemberData[];

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

// ✅ Diubah dari callback pattern → return Promise
export async function signInWithProvider(
    userData: any,
    providerName: string
) {
    try {
        const q = query(
            collection(db, "members"),
            where("email", "==", userData.email),
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as MemberData[];

        if (data.length > 0) {
            userData.role = data[0].role;

            await updateDoc(doc(db, "members", data[0].id), userData);

            return {
                status: "success",
                message: `User logged in with ${providerName} successfully`,
                data: data[0],
            };
        } else {
            userData.role = "members";

            const docRef = await addDoc(collection(db, "members"), userData);

            return {
                status: "success",
                message: `User registered with ${providerName}`,
                data: { id: docRef.id, ...userData },
            };
        }
    } catch (error) {
        return {
            status: "error",
            message: `Failed with ${providerName}`,
        };
    }
}

export async function signInWithGithub(
    userData: any,
    providerName: string
) {
    return signInWithProvider(userData, providerName);
}

export async function signInWithGoogle(
    userData: any,
    
    providerName: string
) {
    return signInWithProvider(userData, providerName);
}