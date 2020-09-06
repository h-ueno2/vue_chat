import firebase from 'firebase';
import { ChatUser } from '@/modules/type';

export default class UserAccess {
  /**
   * ログイン中のユーザーを返却します。
   *
   */
  public static async getCurrentUser(): Promise<ChatUser> {
    const uid = firebase.auth().currentUser?.uid || '';
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

  /**
   * ユーザをRDBに作成します。
   * @param uid ユーザのUID
   * @param user ユーザ情報
   */
  public static async createUser(
    uid: string,
    name: string,
    email: string,
  ): Promise<void> {
    return firebase.database().ref('users/' + uid).set({
      name,
      email,
    });
  }

  /**
   * RDBのユーザ情報を更新します。
   * @param uid 対象ユーザのuid
   * @param values 変更内容
   */
  public static async updateUser(uid: string, values: object): Promise<void> {
    return firebase.database().ref('users/' + uid).update(values);
  }
}
