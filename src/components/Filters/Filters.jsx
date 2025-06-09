import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';

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
    },
    sizeScrollContainer: {
      maxHeight: 120,
      overflowY: 'scroll',
      paddingRight: 8,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      borderRadius: 4,
      border: '1px solid #ccc',
      boxShadow: 'inset 0 -6px 6px -6px rgba(0,0,0,0.2)'
    },
    sizeLabel: {
      fontSize: '0.85rem',
      margin: 0
    }
  }));

  const classes = useStyles();

  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [categories, setCategories] = useState([]);

  const sizeOptions = {
    Damen: ['S', 'M', 'L', 'XL'],
    Herren: ['S', 'M', 'L', 'XL', '3XL'],
    Baby: ['50', '56', '62', '68', '74', '80', '86', '92'],
    Kleinkinder: ['98', '104', '110', '116', '122', '128'],
    Kinder: ['134', '140', '146', '152', '158', '164', '170', '176'],
  };

  const categoryOptions = ['Herren', 'Frauen'];

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    setSize('');
    filterProducts({ gender: selectedGender, size: '', categories });
  };

  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSize(selectedSize);
    filterProducts({ gender, size: selectedSize, categories });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.name;
    const newCategories = e.target.checked
      ? [...categories, value]
      : categories.filter((cat) => cat !== value);
    setCategories(newCategories);
    filterProducts({ gender, size, categories: newCategories });
  };

  const clearFilters = () => {
    setGender('');
    setSize('');
    setCategories([]);
    filterProducts({});
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerContainer}>

        {/* Geschlecht */}
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Geschlecht</FormLabel>
          <RadioGroup value={gender} onChange={handleGenderChange}>
            <FormControlLabel value="Damen" control={<Radio />} label="Damen (S–XL)" />
            <FormControlLabel value="Herren" control={<Radio />} label="Herren (S–3XL)" />
            <FormControlLabel value="Baby" control={<Radio />} label="Baby (50–92)" />
            <FormControlLabel value="Kleinkinder" control={<Radio />} label="Kleinkinder (98–128)" />
            <FormControlLabel value="Kinder" control={<Radio />} label="Kinder (134–176)" />
          </RadioGroup>
        </FormControl>

        {/* Größe */}
        {gender && (
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Größe</FormLabel>
            <div className={classes.sizeScrollContainer}>
              <RadioGroup value={size} onChange={handleSizeChange}>
                {sizeOptions[gender]?.map((s) => (
                  <FormControlLabel
                    key={s}
                    value={s}
                    control={<Radio size="small" />}
                    label={<span className={classes.sizeLabel}>{s}</span>}
                  />
                ))}
              </RadioGroup>
            </div>
          </FormControl>
        )}

        {/* Kategorien */}
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Kategorien</FormLabel>
          <FormGroup>
            {categoryOptions.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    checked={categories.includes(cat)}
                    onChange={handleCategoryChange}
                    name={cat}
                  />
                }
                label={cat}
              />
            ))}
          </FormGroup>
        </FormControl>

        {/* Reset Button */}
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
