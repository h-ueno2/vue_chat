import Room from '@/modules/Room';
import { ChatUser } from '@/modules/type';

describe('Room', (): void => {
  const roomCd = 'room01';
  const roomName = 'room name';
  const memberIds = ['00001', '00002', '00003'];
  const members: ChatUser[] = [
    {
      uid: '00001',
      name: 'テスト　太郎',
      email: 'test01@example.com',
    },
    {
      uid: '00002',
      name: 'テスト　次郎',
      email: 'test02@example.com',
    },
    {
      uid: '00003',
      name: 'テスト　三郎',
      email: 'test03@example.com',
    },
  ];
  describe('getMember', (): void => {
    const room = new Room(roomCd, roomName, memberIds, members);

    test('対象のユーザーが存在する場合はユーザーを返却', (): void => {
      const member = room.getMember('00002');
      expect(member).toBeDefined();
      expect(member?.uid).toBe('00002');
      expect(member?.name).toBe('テスト　次郎');
      expect(member?.email).toBe('test02@example.com');
    });

    test('対象のユーザーが存在しない場合はundefindを返却', (): void => {
      const member = room.getMember('99999');
      expect(member).toBeUndefined();
    });

    test('membersが空であってもエラーとならないこと', (): void => {
      const newRoom = new Room(roomCd, roomName, []);
      const member = newRoom.getMember('00001');
      expect(member).toBeUndefined();
    });
  });

  describe('existsMemberUid', (): void => {
    const room = new Room(roomCd, roomName, memberIds);

    test('対象のユーザーが存在する場合はtrueを返却', (): void => {
      expect(room.existsMemberUid('00002')).toBeTruthy();
    });

    test('対象のユーザーが存在しない場合はfalseを返却', (): void => {
      expect(room.existsMemberUid('99999')).toBeFalsy();
    });

    test('空白を渡した場合はfalseを返却', (): void => {
      expect(room.existsMemberUid('')).toBeFalsy();
    });

    test('memberIdsが空の場合はfalseを返却', (): void => {
      const newRoom = new Room(roomCd, roomName, []);
      expect(newRoom.existsMemberUid('00001')).toBeFalsy();
    });
  });
});
