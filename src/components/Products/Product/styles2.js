import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        // maxWidth: 345, original width style
        maxWidth: '100%',
    },
    media: {
        height: 250,
        paddingTop: '56.25%', // 16:9
        backgroundRepeat: 'no-repeat',
        backgroundSize: "contain",
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 0
    },
    chip: {
        marginRight: 'auto',
        fontSize: '0.9125rem',
        backgroundColor: '#C3DCAC !important'
    },
    iconImage: {
        width: '1em',
        marginBottom: '2px',
        padding:'2px'
    },
    accordion:{
        boxShadow:'none'
    }
}));
