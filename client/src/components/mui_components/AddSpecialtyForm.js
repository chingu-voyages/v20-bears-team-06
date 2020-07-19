import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_USER_SPEC } from '../../graphql/Mutations';
import { Formik, Form, Field } from 'formik';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { TextInputField } from '../fields/TextInputField';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {

  },
  submit: {},
  field : {
      
  }
}));

export const AddSpecialtyForm = (props) => {
  let { userId } = useParams();

  const [spec] = useMutation(ADD_USER_SPEC);

  const classes = useStyles();


  const InputProps = {
    margin: 'dense',
    size: 'small'

  }

  return (
    <Grid container xs={12}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="subtitle1" align="center">
          Add Specialty
        </Typography>

        <Formik
          initialValues={{
            specialty: '',
            focusIn: '',
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={Yup.object({
            specialty: Yup.string()
              .min(2)
              .max(40, 'specialty must be between 2-40 characters'),
            focusIn: Yup.string()
              .min(2)
              .max(40, 'specialty focus must be between 2-40 characters'),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            setTimeout(async () => {
              try {
                const response = await spec({
                  variables: {
                    userId,
                    title: values.specialty,
                    subtitle: values.focusIn,
                  },
                });

              } catch (e) {
                console.log('error with submit', e);
              }

              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className={classes.form} noValidate>
              <Grid item container direction='column' justify='center'>
                  <Grid item>
            <Field
              label="Specialty"
              type="text"
              name="specialty"
              variant="outlined"
              InputProps={InputProps}
              margin='dense'
              size='small'
              autoFocus
              
              id="specialty"
              as={TextInputField}
              
            />
            </Grid>
            <Grid item>
            <Field
                
                label='Focus In'
                type='text'
                name='focusIn'
                placholder={`'calculus','16th century', ...`}
                variant = 'outlined'
                autoFocus
                margin='dense'
                size='small'
                InputProps={InputProps}
                id='focusIn'
                as={TextInputField}
             />
             </Grid>
             <Grid item>
             <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
              >
                Submit
              </Button>
              </Grid>
              </Grid>
          </Form>
        </Formik>
      </div>
    </Grid>
  );
};
