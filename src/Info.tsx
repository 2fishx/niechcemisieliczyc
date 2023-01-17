import { Typography } from "@mui/material";

export const Info = () => {
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        Konwerter donejtów, subów i bitsów na złotówki dla odlicznika Tipply
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Wpisz w pole poniżej kwoty donejtów, bitsów i ilość subów z odpowiednią
        końcówką (z - złotych, b - bitsów, s - subów) i wciśnij enter lub guzik
        obok by obliczyć liczbę złotych jaką trzeba dodać do licznika w Tipply
        (kwota kopiuje się automatycznie do schowka).
        Poniżej jest też historia dodawanych kwot.
      </Typography>
      <Typography variant="body1">Przykłady:</Typography>
      {["10.5z", "200b150b", "5s20s30z", "20z30z1000z42s700b69b"].map((e) => (
        <Typography key={e} variant="body1">
          {e}
        </Typography>
      ))}
    </>
  );
};
