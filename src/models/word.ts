export interface IWord {
  original: string;
  translation?: string;
  meaning?: string;
  learnedTimes?: number;
  startLearnedDate?: Date;
  createdDate?: Date;
  examples?: string;
}

export default class Word implements IWord {

    original: string;
    translation?: string;
    examples?: string;
    learnedTimes?: number;
    startLearnedDate?: Date;
    createdDate?: Date;

    constructor(original: string, translation: string, learnedTimes: number, startLearnedDate: Date) {
        this.original = original;
        this.translation = translation;
        this.learnedTimes = learnedTimes;
        this.startLearnedDate = startLearnedDate;
    }

}

export const wordConverter = {
      toFirestore: function(word: IWord) {
          return {
              original: word.original,
              translation: word.translation,
              learnedTimes: word.learnedTimes,
              startLearnedDate: word.startLearnedDate ? new Date(word.startLearnedDate) : null
        }
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          return new Word(data.original, data.translation, data.learnedTimes, data.startLearnedDate)
      }
  }
