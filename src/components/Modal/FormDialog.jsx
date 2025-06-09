import React, { useState } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core';

export default function FormDialog({ open, setOpen }) {
    const [step, setStep] = useState(0);

    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [income, setIncome] = useState('');
    const [clothing, setClothing] = useState('');

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleFinish = () => {
        let budget = 0;
        if (clothing === 'unter 100€') budget = 100;
        else if (clothing === '100-200€') budget = 200;
        else if (clothing === 'über 200€') budget = 300;
      
        // 🧠 Vorhandene Daten beibehalten, nur erweitern:
        window.results = {
          ...window.results, // 👈 existierende Werte wie id, group, subjectGroup etc. erhalten
          age,
          gender,
          income,
          clothing,
          budget
        };
      
        setStep(5); // zeige Budget-Popup
      };
      

    const handleStartShopping = () => {
        setOpen(false);
        setStep(0); // reset
    };

    const isCurrentStepValid = () => {
        switch (step) {
            case 1: return !!age;
            case 2: return !!gender;
            case 3: return !!income;
            case 4: return !!clothing;
            default: return true;
        }
    };

    const handleClose = () => {
        setOpen(false);
        setStep(0);
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <>
                        <DialogTitle>Willkommen zur Shopping-Studie</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Danke, dass du an dieser Untersuchung teilnimmst. Dein Feedback hilft uns, das Online-Shopping-Erlebnis der Zukunft zu verbessern.
                                <br /><br />
                                <strong>Deine Aufgabe:</strong><br />
                                Stöbere in unserem Shop und kaufe so ein, wie du es in einem echten Online-Shop tun würdest.
                                Du hast ein virtuelles Budget, das du frei nutzen kannst.
                                <br /><br />
                                Achte auf Details wie Preise, Produktinfos, Nachhaltigkeit etc. – du gibst kein echtes Geld aus, entscheide aber realistisch.
                                <br /><br />
                                Beantworte bitte zunächst 4 kurze Fragen.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleNext} color="primary" variant="contained">Weiter</Button>
                        </DialogActions>
                    </>
                );

            case 1:
                return (
                    <>
                        <DialogTitle>1. Wie alt bist du?</DialogTitle>
                        <DialogContent>
                            <FormControl component="fieldset">
                                <RadioGroup value={age} onChange={(e) => setAge(e.target.value)}>
                                    <FormControlLabel value="unter 18" control={<Radio />} label="unter 18" />
                                    <FormControlLabel value="18-24" control={<Radio />} label="18-24" />
                                    <FormControlLabel value="25-34" control={<Radio />} label="25-34" />
                                    <FormControlLabel value="35-44" control={<Radio />} label="35-44" />
                                    <FormControlLabel value="45-54" control={<Radio />} label="45-54" />
                                    <FormControlLabel value="55+" control={<Radio />} label="55+" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleNext} color="primary" variant="contained" disabled={!isCurrentStepValid()}>
                                Weiter
                            </Button>
                        </DialogActions>
                    </>
                );

            case 2:
                return (
                    <>
                        <DialogTitle>2. Mit welchem Geschlecht identifizierst du dich?</DialogTitle>
                        <DialogContent>
                            <FormControl component="fieldset">
                                <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <FormControlLabel value="weiblich" control={<Radio />} label="weiblich" />
                                    <FormControlLabel value="männlich" control={<Radio />} label="männlich" />
                                    <FormControlLabel value="divers" control={<Radio />} label="divers" />
                                    <FormControlLabel value="keine Angabe" control={<Radio />} label="keine Angabe" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleNext} color="primary" variant="contained" disabled={!isCurrentStepValid()}>
                                Weiter
                            </Button>
                        </DialogActions>
                    </>
                );

            case 3:
                return (
                    <>
                        <DialogTitle>3. Wie hoch ist dein monatliches Nettoeinkommen?</DialogTitle>
                        <DialogContent>
                            <FormControl component="fieldset">
                                <RadioGroup value={income} onChange={(e) => setIncome(e.target.value)}>
                                    <FormControlLabel value="unter 1500€" control={<Radio />} label="unter 1500€" />
                                    <FormControlLabel value="1500-2000€" control={<Radio />} label="1500-2000€" />
                                    <FormControlLabel value="2000-2500€" control={<Radio />} label="2000-2500€" />
                                    <FormControlLabel value="2500-3500€" control={<Radio />} label="2500-3500€" />
                                    <FormControlLabel value="über 3500€" control={<Radio />} label="über 3500€" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleNext} color="primary" variant="contained" disabled={!isCurrentStepValid()}>
                                Weiter
                            </Button>
                        </DialogActions>
                    </>
                );

            case 4:
                return (
                    <>
                        <DialogTitle>4. Wie viel gibst du monatlich für Kleidung aus?</DialogTitle>
                        <DialogContent>
                            <FormControl component="fieldset">
                                <RadioGroup value={clothing} onChange={(e) => setClothing(e.target.value)}>
                                    <FormControlLabel value="unter 100€" control={<Radio />} label="unter 100€" />
                                    <FormControlLabel value="100-200€" control={<Radio />} label="100-200€" />
                                    <FormControlLabel value="über 200€" control={<Radio />} label="über 200€" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleFinish} color="primary" variant="contained" disabled={!isCurrentStepValid()}>
                                Weiter
                            </Button>
                        </DialogActions>
                    </>
                );

            case 5:
                let budgetText = '';
                if (clothing === 'unter 100€') budgetText = '100 €';
                else if (clothing === '100-200€') budgetText = '200 €';
                else if (clothing === 'über 200€') budgetText = '300 €';

                return (
                    <>
                        <DialogTitle>Dein virtuelles Budget</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Basierend auf deinen Angaben darfst du mit einem virtuellen Budget von <strong>{budgetText}</strong> shoppen.
                                <br /><br />
                                Viel Spaß im Ernstings-Shop!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleStartShopping} color="primary" variant="contained">
                                Los geht's!
                            </Button>
                        </DialogActions>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={(event, reason) => {
            if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                handleClose();
            }
        }} maxWidth="sm" fullWidth>
            {renderStepContent()}
        </Dialog>
    );
}
