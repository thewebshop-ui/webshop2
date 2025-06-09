import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    media: {
        height: 250,
        paddingTop: '56.25%', // 16:9
        backgroundRepeat: 'no-repeat',
        backgroundSize: "contain",
    },
    content: {
        flexGrow: 1,
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between', // Button wird am rechten Rand positioniert
        marginTop: 'auto',
        paddingLeft: '16px',
        paddingRight: '16px',
    },
    addToCartButton: {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
        padding: '10px',
        borderRadius: '50%', // Makes it a circle
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
        margin: '10px'
    },
    saveEnergyTag: {
        height:'70px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#8BC34A',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '10px',
        width: '95%',
    },
    saveEnergyText: {
        fontWeight: 'bold',
        color: '#fff',
    },
    saveEnergyTagPlaceholder:{
        height:'70px',
        margin:'10px'
    },
    saveEnergySubText: {
        color: '#fff',
    },
    infoIcon: {
        color: '#fff',
    },
    drawerContent: {
        width: 350,
        padding: 40,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    efficiencyClass: {
        margin: '10px 0',
        padding: 0,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
    },
    accordion: {
        width: '100%',
        boxShadow: 'none', // Removes border/shadow
        border: 'none', // Ensure no border
        '&:before': {
            display: 'none', // Remove default border line
        },
    },
    heading: {
        fontSize: '1rem',
    },
    accordionDetails: {
        display: 'flex',
        flexDirection: 'column',
    },
    productInfoItem: {
        marginBottom: '10px',
    },
    sustainableChip: {
        display: 'none', // Hidden since it's no longer needed
    },
    efficiencyBody:{
        marginTop:'20px'
    },
    infoButton: {
        marginTop: '10px',
        textTransform: 'none'
    }    
}));
