import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_PROFILE_MUTATION } from "../graphql/Mutations";
import { GET_PROFILE } from "../graphql/Queries";
import { uploadToS3 } from "../utils/uploadToS3";
import { formatFileName } from "../utils/formatFileName";
import { Redirect } from 'react-router-dom';
import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  useTheme,
  Typography,
  TextField,
} from "@material-ui/core";
import { TextInputField } from "./fields/TextInputField";
import { TextAreaField } from "./fields/TextAreaField";
import * as Yup from "yup";
import { DropZoneField } from "./mui_components/DropzoneArea";
import { weirdRouter } from '../utils/weirdRouter';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    '& input' : {
      fontSize: theme.typography.subtitle2
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditForm = ({ meId, profile }) => {
  const [edit] = useMutation(EDIT_PROFILE_MUTATION);
  const [redirect, setRedirect ] = useState(null);
  let isOwnProfile;

  if (profile&&meId){
    isOwnProfile = profile.id===meId;
  }

  const theme = useTheme();

  const classes = useStyles(theme);

  if (profile){
    return (
      <Container component="main" maxWidth="xs">
        {redirect!==null&&<Redirect to={redirect} />}
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Edit Profile
          </Typography>
          <Formik
            initialValues={{
              firstName: profile.firstName,
              lastName: profile.lastName,
              school: profile.school,
              department: profile.department,
              position: profile.position,
              aboutMe: profile.about_me,
              location: profile.location,
              file:[],
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object({
              firstName: Yup.string().min(3).max(40).nullable(),
              lastName: Yup.string().min(3).max(40).nullable(),
              school: Yup.string()
                .min(3)
                .max(60, "School name must be between 3-60 characters")
                .nullable(),
              department: Yup.string()
                .nullable()
                .min(3)
                .max(60, "department name must be between 3-60 characters"),
              position: Yup.string()
                .nullable()
                .min(3)
                .max(60, "position must be between 3-60 characters"),
              aboutMe: Yup.string()
                .nullable()
                .min(1)
                .max(140, "About me must be between 1-140 characters"),
              file: Yup.array().nullable(),
            })}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              let type, name;
              if (values.file[0]) {
                let file = values.file[0].file;
                type = file.type;
                name = file.name;
              }
              setTimeout(async () => {
                try {
                  const response = await edit({
                    variables: {
                      userId: meId,
                      school: values.school ? values.school : profile.school,
                      department: values.department
                        ? values.department
                        : profile.department,
                      position: values.position
                        ? values.position
                        : profile.position,
                      about_me: values.aboutMe
                        ? values.aboutMe
                        : profile.about_me,
                      location: values.location
                        ? values.location
                        : profile.location,
                      filetype: type ? type : null,
                      filename: name ? formatFileName(name) : null,
                      firstName: values.firstName?
                      values.firstName: profile.lastName,
                      lastName: values.lastName? values.lastName: profile.lastName,
                    },refetchQueries: [{query: GET_PROFILE, variables:{userId: meId}}],
                      awaitRefetchQueries: true
                  });
                  
                  if (response && response.data && !response.data.editUser) {
                    setFieldError("invalid field data");
                    return;
                  }
                  if (response && response.data && response.data.editUser.s3) {
                    const s3 = response.data.editUser.s3;
                    const s3response = await uploadToS3(
                      values.file[0].file,
                      s3.signedRequest
                    );

                    console.log(s3response)
                    
                    
                  }
                } catch (e) {
                  
                }
                setRedirect(`/profile/${profile.id}`);
               
                
                
              }, 400);
            }}
          >
            <Form className={classes.form} noValidate>
            <Field
                label="Update First Name"
                name="firstName"
                type="text"
                margin="normal"
                placeholder={profile.firstName || "enter school name"}
                variant="outlined"
                autoFocus
                fullWidth
                id="firstName"
                as={TextInputField}
              ></Field>
              <Field
                label="Update Last Name"
                name="lastName"
                type="text"
                placeholder={profile.lastName || "enter school name"}
                variant="outlined"
                autoFocus
                margin="normal"
                fullWidth
                id="lastName"
                as={TextInputField}
              ></Field>
              <Field
                label="Update School"
                margin="normal"
                name="school"
                type="text"
                placeholder={profile.school || "enter school name"}
                variant="outlined"
                autoFocus
                fullWidth
                id="school"
                as={TextInputField}
              ></Field>
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="department"
                label="Department"
                type="text"
                id="department"
                placeholder={profile.school || null}
                as={TextInputField}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="position"
                label="Position"
                type="text"
                id="position"
                placeholder={profile.position || null}
                as={TextInputField}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="location"
                label="Location"
                type="text"
                id="location"
                placeholder={profile.location || null}
                as={TextInputField}
              />
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                name="aboutMe"
                label="About Me"
                type="text"
                id="aboutMe"
                placeholder={profile.about_me || null}
                as={TextAreaField}
              />
              <Field
                variant="outlined"
                margin="normal"
                name="file"
                label="Update Profile Picture"
                type="file"
                id="file"
                as={DropZoneField}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
              >
                Submit
              </Button>
            </Form>
          </Formik>
        </div>
      </Container>
    );}else{
      return null;
    }};

export default EditForm;
