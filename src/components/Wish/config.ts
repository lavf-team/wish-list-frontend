import { buttonStyles } from 'components/buttons/config';
import { RoundEmojiStyles } from 'components/RoundEmoji/config';
import coolEmojiUrl from 'img/coolEmoji.svg';
import defaultUser from 'img/defaultuser.jpg';
import favoriteEmojiUrl from 'img/favoriteEmoji.svg';
import giftUrl from 'img/gift.svg';
import sadEmojiUrl from 'img/sadEmoji.svg';

export enum wishSize {
  FULL = 'full',
  FIXED = 'fixed',
}

export const wishState = {
  CAN_BE_ADDED: {
    title: 'canBeAdded',
    text: 'Добавить в избранное',
    style: buttonStyles.BLUE,
    emojiInside: {
      has: false,
      url: null,
    },
    emojiOutside: {
      has: false,
      url: null,
      style: null,
    },
  },
  CAN_BE_DELETED: {
    title: 'canBeDeleted',
    text: 'Удалить',
    style: buttonStyles.LIGHT,
    emojiInside: {
      has: false,
      url: null,
    },
    emojiOutside: {
      has: false,
      url: null,
      style: null,
    },
  },
  CAN_BE_DELETED_GIVEN: {
    title: 'canBeDeletedGiven',
    text: 'Удалить',
    style: buttonStyles.LIGHT,
    emojiInside: {
      has: false,
      url: null,
    },
    emojiOutside: {
      has: true,
      url: giftUrl,
      style: RoundEmojiStyles.RED,
    },
  },
  CAN_NOT_GIVE_FAVORITE: {
    title: 'canNotGiveFavorite',
    text: 'Не подарю',
    style: buttonStyles.LIGHT,
    emojiInside: {
      has: true,
      url: sadEmojiUrl,
    },
    emojiOutside: {
      has: false,
      url: null,
      style: null,
    },
  },
  CAN_NOT_GIVE_NOT_FAVORITE: {
    title: 'canNotGiveNotFavorite',
    text: 'Не подарю',
    style: buttonStyles.LIGHT,
    emojiInside: {
      has: true,
      url: sadEmojiUrl,
    },
    emojiOutside: {
      has: true,
      url: favoriteEmojiUrl,
      style: RoundEmojiStyles.BLUE,
    },
  },
  CAN_NOT_GIVE_WITH_AVATAR: {
    title: 'canNotGiveWithAvatar',
    text: 'Не подарю',
    style: buttonStyles.LIGHT,
    emojiInside: {
      has: true,
      url: sadEmojiUrl,
    },
    emojiOutside: {
      has: true,
      url: defaultUser,
      style: null,
    },
  },
  CAN_GIVE_NOT_FAVORITE: {
    title: 'canGiveNotFavorite',
    text: 'Подарю',
    style: buttonStyles.BLUE,
    emojiInside: {
      has: true,
      url: coolEmojiUrl,
    },
    emojiOutside: {
      has: true,
      url: favoriteEmojiUrl,
      style: RoundEmojiStyles.BLUE,
    },
  },
  CAN_GIVE_FAVORITE: {
    title: 'canGiveFavorite',
    text: 'Подарю',
    style: buttonStyles.BLUE,
    emojiInside: {
      has: true,
      url: coolEmojiUrl,
    },
    emojiOutside: {
      has: false,
      url: null,
      style: null,
    },
  },
  ALREADY_GIVEN_NOT_FAVORITE: {
    title: 'alreadyGivenNotFavorite',
    text: 'Уже подарят',
    style: buttonStyles.GRAY,
    emojiInside: {
      has: false,
      url: null,
    },
    emojiOutside: {
      has: true,
      url: favoriteEmojiUrl,
      style: RoundEmojiStyles.BLUE,
    },
  },
  ALREADY_GIVEN_FAVORITE: {
    title: 'alreadyGivenFavorite',
    text: 'Уже подарят',
    style: buttonStyles.GRAY,
    emojiInside: {
      has: false,
      url: null,
    },
    emojiOutside: {
      has: false,
      url: null,
      style: null,
    },
  },
};
