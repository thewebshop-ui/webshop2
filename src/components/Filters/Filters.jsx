import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const Filters = ({ filterProducts }) => {
  const drawerWidth = 190;
  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: 5
    },
    drawerPaper: {
      width: drawerWidth,
      top: '8%',
    },
    drawerContainer: {
      marginTop: 30,
      padding: 20,
      overflow: 'hidden',
    },
    formControl: {
      marginBottom: theme.spacing(2),
    },
    clearButton: {
      marginTop: theme.spacing(2),
    }
  }));

  const classes = useStyles();

  const [targetGroups, setTargetGroups] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const geschlechtOptions = [
    "Damen", "Herren",
    "Baby Jungen", "Baby Mädchen","Kleinkinder Jungen", "Kleinkinder Mädchen",
    "Kinder Jungen", "Kinder Mädchen"
  ];

  const kategorieOptions = [
    "Bekleidung", "Wäsche"
  ];

  const handleTargetGroupChange = (e) => {
    const value = e.target.name;
    const newGroups = e.target.checked
      ? [...targetGroups, value]
      : targetGroups.filter((g) => g !== value);
    setTargetGroups(newGroups);
    filterProducts({ targetGroups: newGroups, productTypes });
  };

  const handleProductTypeChange = (e) => {
    const value = e.target.name;
    const newTypes = e.target.checked
      ? [...productTypes, value]
      : productTypes.filter((g) => g !== value);
    setProductTypes(newTypes);
    filterProducts({ targetGroups, productTypes: newTypes });
  };

  const clearFilters = () => {
    setTargetGroups([]);
    setProductTypes([]);
    filterProducts({ targetGroups: [], productTypes: [] });
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerContainer}>

        {/* Geschlecht / Zielgruppe (ohne Label) */}
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            {geschlechtOptions.map((opt) => (
              <FormControlLabel
                key={opt}
                control={
                  <Checkbox
                    checked={targetGroups.includes(opt)}
                    onChange={handleTargetGroupChange}
                    name={opt}
                  />
                }
                label={opt}
              />
            ))}
          </FormGroup>
        </FormControl>

        {/* Kategorien */}
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Kategorie</FormLabel>
          <FormGroup>
            {kategorieOptions.map((opt) => (
              <FormControlLabel
                key={opt}
                control={
                  <Checkbox
                    checked={productTypes.includes(opt)}
                    onChange={handleProductTypeChange}
                    name={opt}
                  />
                }
                label={opt}
              />
            ))}
          </FormGroup>
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          className={classes.clearButton}
          onClick={clearFilters}
        >
          Filter zurücksetzen
        </Button>
      </div>
    </Drawer>
  );
};

export default Filters;
