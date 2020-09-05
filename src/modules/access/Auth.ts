import firebase from 'firebase';

export default class Auth {
  /**
   * サインインを行います。
   * @param email サインインに使用するemail
   * @param password サインインに使用するパスワード
   */
  public static async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * ユーザの作成を行います。
   * @param email email
   * @param password password
   */
  public static async createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  /**
   * サインアウトします。
   */
  public static async signOut(): Promise<void> {
    return firebase.auth().signOut();
  }

  /**
   * firebaseにログイン中のユーザを取得する。
   */
  public static getCurrentUser(): firebase.User | null {
    return firebase.auth().currentUser;
  }
}
