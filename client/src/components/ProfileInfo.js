import React, { useContext } from 'react';
import { Link , useRouteMatch } from 'react-router-dom';
import { Grid, Avatar, Container, Paper, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_SPECIALTIES } from '../graphql/Queries';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CoverPhoto from './CoverPhoto';
import { ProfileContext } from '../pages/ProfilePage';

const useStyles = makeStyles((theme) => ({
  mainCard: {
    [theme.breakpoints.up('md')]: {
      height: '84vh',
    },
  },
  avatar: {
    [theme.breakpoints.up('xs')]: {
      height: theme.spacing(8),
      width : theme.spacing(8),
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom : theme.spacing(2),
      marginTop : theme.spacing(4)
    },
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(15),
      width: theme.spacing(15),
      marginLeft: 'auto',
      marginRight : 'auto',
      marginBottom : theme.spacing(4)
    },
  },
  specialtyCard : {
    boxShadow : 'none'
  },
  cardList : {
    listStyle : 'none',
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'center',
    '& li' : {
      margin : theme.spacing(1,'auto'),
      '& div' : {
        minWidth : theme.spacing(10)
      }
    }
  },
  longCard : {
    height: '100%'
  },
  routerLink : {
    textDecoration : 'none',
    height: '75%',
    width: '75%'
  }
}));

const ProfileInfo = () => {
  let context = useContext(ProfileContext);

  let { profile, isOwnProfile } = context || null;

  let { url } = useRouteMatch();

  const classes = useStyles();

  let specialties =
    profile && profile.getSpecialties ? profile.getSpecialties : null;
  if (specialties) {
    specialties = specialties.map((el) => {
      return(
        <li key={`${profile.id}${el.title}`}>
          <Chip variant='outlined' color='primary' size='small' label={el.title} />
        </li>
    

      )
    });
  }

  return (
    <Grid item container xs={12} direction="column">
      <Card>
        <CardActionArea>
        <CardMedia>
          <Avatar className={classes.avatar} src={profile && profile.image}></Avatar>
        </CardMedia>
        <Grid  container direction='row' justify='center' xs={12}>
        <Grid item gutterBottom>
        {isOwnProfile&&<Link className={classes.routerLink} to={`${url}/edit`}><Button className={classes.routerLink} gutterBottom size='small' variant='outlined' color='primary'>edit</Button></Link>}
        </Grid>
        </Grid>
        
          <Typography align='center' variant='h6'>{profile&&profile.name}</Typography>
        
        </CardActionArea>
        <CardContent>
          <Typography align='center' variant='subtitle1'>{profile&&profile.location}</Typography>
          <Typography align='center' variant='subtitle1'>{profile&&profile.employment}</Typography>
          <Typography align='center' variant='subtitle1'>{profile&&profile.school}</Typography>


          <Grid container xs={12} alignItems='center' direction='column'>
            <Grid item xs={10}>
              <Card className={classes.specialtyCard}>
                
                <CardContent className={classes.cardList} component='ul'>
                <Typography color='primary' variant='body1' align='center' gutterBottom='true'><strong>Specialties</strong></Typography>
                  {specialties}

                </CardContent>
              </Card>
          

          </Grid>
         
          </Grid>
          
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProfileInfo;
