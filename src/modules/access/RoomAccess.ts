import firebase from 'firebase';
import Room from '@/modules/Room';
import UserAccess from '@/modules/access/UserAccess';
import { ChatUser } from '@/modules/type';

export default class RoomAccess {
  /**
   * 引数RoomCdにしたがってRoomを取得します。
   * @param roomCd 取得対象のRoomのCode
   */
  public static async getRoom(roomCd: string): Promise<Room> {
    return await new Promise<Room>((resolve) => {
      firebase.database().ref('rooms/' + roomCd).once('value').then((snap) => {
        const members: ChatUser[] = [];
        const memberIds: string[] = [];
        snap.child('members').forEach((member) => {
          if (member.key && member.val()) {
            memberIds.push(member.key);
            UserAccess.getUserByUid(member.key).then((res) => {
              members.push(res);
            });
          }
        });
        resolve(new Room(roomCd, snap.child('name').val(), memberIds, members));
      });
    });
  }

  /**
   * Room一覧を取得します。
   */
  public static async getRooms(): Promise<Room[]> {
    return await new Promise<Room[]>(async (resolve) => {
      const rooms: Room[] = [];
      await firebase.database().ref('rooms').on('child_added', (snap) => {
        const roomCd = snap.key || '';
        const memberIds: string[] = [];
        snap.child('members').forEach((member) => {
          if (member.val()) {
            memberIds.push(member.key as string);
          }
        });
        const room = new Room(
          roomCd,
          snap.child('name').val(),
          memberIds,
        );
        rooms.push(room);
      });
      resolve(rooms);
    });
  }
}
