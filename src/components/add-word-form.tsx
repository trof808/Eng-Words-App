import React, { useContext } from 'react';

import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import GlobalStore from '../context/global-context';
import { IWord } from '../models/word';

const FormStyle = styled(Form)`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  flex-direction: column;
`;

const AddWordForm = () => {
  const globalStore = useContext(GlobalStore);

  const addWord = (word: IWord) => {
    globalStore.db.collection("words").add(word)
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
  }

  const onHandleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      addWord(values);
      console.log(JSON.stringify(values, null, 2));
    }, 500);
  }

  return (
    <div>
      <Typography gutterBottom variant="subtitle1" style={{ textAlign: 'center' }}>
        Добавить слово или фразу
      </Typography>
      <Formik
        initialValues={{
          original: '',
          meaning: '',
          translation: '',
          learnedTimes: 0,
          createdDate: new Date()
        }}
        validate={values => {
          const errors: Partial<IWord> = {};
          if (!values.original) {
            errors.original = 'Required';
          }
          return errors;
        }}
        onSubmit={onHandleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <FormStyle>
          {isSubmitting && <LinearProgress />}
            <Field
              component={TextField}
              name="original"
              type="text"
              label="Слово / Фраза"
            />
            <br />
            <Field
              component={TextField}
              type="text"
              label="Значение на английском"
              name="meaning"
            />
            <br />
            <Field
              component={TextField}
              type="text"
              label="Перевод"
              name="translation"
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Добавить
            </Button>
          </FormStyle>
        )}
      </Formik>
    </div>
  )
}

export default AddWordForm;
