import React, { useState, useEffect, useContext } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { IWord, wordConverter } from '../models/word';
import GlobalStore from '../context/global-context';

import firebase from "firebase/app";

import * as Styled from './app.styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: '30px 16px',
      marginBottom: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
  }),
);

const App = () => {
  const globalStore = useContext(GlobalStore);
  const classes = useStyles();

  const [today, setToday] = useState(new Date());
  const [countLearnToday, setCountLearnToday] = useState(10);
  const [todayWords, setTodayWords] = useState<Array<IWord>>([]);
  const [retryWords1, setRetryWords1] = useState<Array<IWord>>([]);
  const [retryWords2, setRetryWords2] = useState<Array<IWord>>([]);

  useEffect(() => {
    getTodayLearningWords();
    getThreeDaysLearningWords();
    getTwoWeeksDaysLearningWords();
  }, []);

  const getTodayLearningWords = () => {
    let words: Array<IWord> = [];
    globalStore.db.collection("words")
      .where("learnedTimes", "==", 0)
      .limit(countLearnToday)
      .withConverter(wordConverter)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          words.push(doc.data());
        });
      })
      .finally(() => {
        setTodayWords(prevMovies => ([...prevMovies, ...words]));
      });
  }

  const getThreeDaysLearningWords = () => {
    let words: Array<IWord> = [];
    let validDate = new Date(new Date(new Date().setDate(today.getDate() - 4)).setHours(0, 0, 0, 0));
    globalStore.db.collection("words")
      .where("learnedTimes", "==", 1)
      .where("startLearnedDate", "==", firebase.firestore.Timestamp.fromDate(validDate))
      .limit(countLearnToday)
      .withConverter(wordConverter)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          words.push(doc.data());
        });
      })
      .finally(() => {
        setRetryWords1(prevMovies => ([...prevMovies, ...words]));
      });
  }

  const getTwoWeeksDaysLearningWords = () => {
    let words: Array<IWord> = [];
    let validDate = new Date(new Date(new Date().setDate(today.getDate() - 15)).setHours(0, 0, 0, 0));
    globalStore.db.collection("words")
      .where("learnedTimes", "==", 1)
      .where("startLearnedDate", "==", firebase.firestore.Timestamp.fromDate(validDate))
      .limit(countLearnToday)
      .withConverter(wordConverter)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          words.push(doc.data());
        });
      })
      .finally(() => {
        setRetryWords2(prevMovies => ([...prevMovies, ...words]));
      });
  }

  return (
    <Styled.App>
      <Grid item xs={12}>
        <Typography gutterBottom variant="subtitle1">
          Новые сегодня
        </Typography>
        {todayWords.map((word: IWord) => {
          return (
            <Card key={word.original} className={classes.paper}>
              {word.original}
              <div style={{ fontSize: '11px' }}>{word.translation}</div>
            </Card>
          )
        })}
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom variant="subtitle1">
          Повторение 3 дня назад
        </Typography>
        {retryWords1.map((word: IWord) => {
          return (
            <Card key={word.original} className={classes.paper}>
              {word.original}
              <div style={{ fontSize: '11px' }}>{word.translation}</div>
            </Card>
          )
        })}
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom variant="subtitle1">
          Повторение неделю назад
        </Typography>
        {retryWords2.map((word: IWord) => {
          return (
            <Card key={word.original} className={classes.paper}>
              {word.original}
              <div style={{ fontSize: '11px' }}>{word.translation}</div>
            </Card>
          )
        })}
      </Grid>
    </Styled.App>
  );
}

export default App;
