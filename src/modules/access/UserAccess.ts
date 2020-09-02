import firebase from 'firebase';
import { ChatUser } from '@/modules/type';

export default class UserAccess {
  /**
   * ログイン中のユーザーを返却します。
   *
   */
  public static async getCurrentUser(): Promise<ChatUser> {
    let uid = '';
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }
      uid = user.uid;
    });
    const currentUser: ChatUser = await this.getUserByUid(uid);
    return currentUser;
  }

  /**
   * 引数で指定したユーザを取得します。
   * @param uid 対象ユーザのUID
   */
  public static async getUserByUid(uid: string): Promise<ChatUser> {
    return await new Promise<ChatUser>((resolve, reject) => {
      firebase.database().ref('users/' + uid).once('value').then((snap) => {
        const user: ChatUser = {
          uid,
          name: snap.child('name').val(),
          email: snap.child('email').val(),
        };
        resolve(user);
      });
    });
  }
}
