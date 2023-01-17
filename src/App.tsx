import { useState } from "react";
import "./App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Button,
  Card,
  createTheme,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
  TextFieldProps,
  ThemeProvider,
} from "@mui/material";
import { Info } from "./Info";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import moment from "moment";

type Calc = {
  date: moment.Moment;
  amountPLN: number;
  calc: string;
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const reFull = /^([\d.]+[zsbZSB])+$/;
const reOne = /([\d.]+)([zsb])/g;

const isEntryOk = (entry: string) => (entry.match(reFull) ? true : false);

function max(arg0: number, arg1: number): number {
  return arg0 > arg1 ? arg0 : arg1;
}

const dividerStyle = { margin: "20px 0px" };

function App() {
  const [lastCalcs, setLastCalcs] = useState<Calc[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // ile sekund za każde z tych
  const [perPLN, setPerPLN] = useState<number>(30);
  const [perSub, setPerSub] = useState<number>(360);
  const [per100Bits, setPer100Bits] = useState<number>(120);

  // snackbar
  const [open, setOpen] = useState(false);

  function addEntry() {
    let sumTime = 0;
    for (const match of inputValue.matchAll(reOne)) {
      let amount = parseFloat(match[1]);
      let amountType = match[2];
      switch (amountType) {
        case "z":
          sumTime += amount * perPLN;
          break;
        case "s":
          sumTime += amount * perSub;
          break;
        case "b":
          sumTime += (amount / 100) * per100Bits;
          break;

        default:
          break;
      }
    }
    let entry: Calc = {
      amountPLN: sumTime / perPLN,
      date: moment(),
      calc: inputValue,
    };
    copyValueToClipboard(entry.amountPLN);
    setLastCalcs((c) => {
      if (c.length > 100) c.length = 9;
      return [entry, ...c];
    });
    setInputValue("");
  }

  const copyValueToClipboard = (value: number) => {
    navigator.clipboard.writeText(value.toFixed(2));
    setOpen(true);
  };

  const deleteCalc = (calc: Calc) =>
    setLastCalcs((c) => c.filter((e) => e !== calc));

  const isInputValueOk = inputValue.length > 0 && isEntryOk(inputValue);

  const handleCalcAction = () => {
    if (isInputValueOk) {
      addEntry();
    }
  };

  const settingsProps: TextFieldProps[] = [
    {
      label: "Za każdą złotówkę",
      value: perPLN,
      onChange: (v) => setPerPLN(max(1, parseInt(v.target.value))),
    },
    {
      label: "Za każdego suba",
      value: perSub,
      onChange: (v) => setPerSub(max(0, parseInt(v.target.value))),
    },
    {
      label: "Za każde 100 bitsów",
      value: per100Bits,
      onChange: (v) => setPer100Bits(max(0, parseInt(v.target.value))),
    },
  ];

  return (
    <div className="App App-header">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Card
          sx={{
            width: "100%",
            maxWidth: 1000,
            bgcolor: "background.paper",
            padding: 2,
            margin: 10,
            alignItems: "center",
          }}
        >
          <Info />
          <Divider style={dividerStyle} />
          <Grid container spacing={2}>
            {settingsProps.map((e) => (
              <Grid item xs={4}>
                <TextField
                  style={{ width: "100%" }}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">sek</InputAdornment>
                    ),
                  }}
                  {...e}
                />
              </Grid>
            ))}
            <Grid item xs={10.5}>
              <TextField
                error={inputValue.length > 0 && !isEntryOk(inputValue)}
                style={{ width: "100%" }}
                variant="outlined"
                placeholder="200b10z5s"
                value={inputValue}
                onChange={(v) =>
                  setInputValue(v.target.value.trim().toLowerCase())
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleCalcAction();
                  }
                }}
              />
            </Grid>
            <Grid item xs={1.5}>
              <Button
                onClick={handleCalcAction}
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                disabled={!isInputValueOk}
              >
                Oblicz
              </Button>
            </Grid>
          </Grid>

          <Divider style={dividerStyle} />
          <div
            style={{ width: "100%", justifyContent: "center", display: "flex" }}
          >
            <List style={{width: "100%", maxWidth: 500 }}>
              {lastCalcs.map((e) => (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteCalc(e)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      <Button
                        endIcon={<ContentCopyIcon />}
                        onClick={() => copyValueToClipboard(e.amountPLN)}
                      >
                        {`${e.amountPLN.toFixed(2)} zł`}
                      </Button>
                    }
                    secondary={
                      <p style={{ wordBreak: "break-all" }}>{`${e.date
                        .format("H:mm")
                        .toString()} ${e.calc}`}</p>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Card>
      </ThemeProvider>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          Skopiowano kwotę do schowka!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
