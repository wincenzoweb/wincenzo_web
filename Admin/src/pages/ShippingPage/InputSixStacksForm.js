import React from "react";
import { Input } from "./Input";

export const InputSixStacksForm = ({
  typeOne,
  typeTwo,
  typeThree,
  typeFour,
  typeFive,
  typeSix,
  typeSeven,
  typeEight,
  typeNine,
  typeTen,
  // typeEleven,
  placeholderOne,
  placeholderTwo,
  placeholderThree,
  placeholderFour,
  placeholderFive,
  placeholderSix,
  placeholderSeven,
  placeholderEight,
  placeholderNine,
  placeholderTen,
  // placeholderEleven,
  onChangeOne,
  onChangeTwo,
  onChangeThree,
  onChangeFour,
  onChangeFive,
  onChangeSix,
  onChangeSeven,
  onChangeEight,
  onChangeNine,
  onChangeTen,
  // onChangeEleven,
  valueOne,
  valueTwo,
  valueThree,
  valueFour,
  valueFive,
  valueSix,
  valueSeven,
  valueEight,
  valueNine,
  valueTen,
  // valueEleven
}) => {
  const eachInputForm = {
    display: "flex",
    flexDirection: "column"
  };
  return (
    <div style={eachInputForm}>
      <Input
        type={typeOne}
        placeholder={placeholderOne}
        onChange={onChangeOne}
        value={valueOne}
      />
      <Input
        type={typeTwo}
        placeholder={placeholderTwo}
        onChange={onChangeTwo}
        value={valueTwo}
      />
      <Input
        type={typeThree}
        placeholder={placeholderThree}
        onChange={onChangeThree}
        value={valueThree}
      />
      <Input
        type={typeFour}
        placeholder={placeholderFour}
        onChange={onChangeFour}
        value={valueFour}
      />
      <Input
        type={typeFive}
        placeholder={placeholderFive}
        onChange={onChangeFive}
        value={valueFive}
      />
      <Input
        type={typeSix}
        placeholder={placeholderSix}
        onChange={onChangeSix}
        value={valueSix}
      />
      <Input
        type={typeSeven}
        placeholder={placeholderSeven}
        onChange={onChangeSeven}
        value={valueSeven}
      /><Input
        type={typeEight}
        placeholder={placeholderEight}
        onChange={onChangeEight}
        value={valueEight}
      /><Input
        type={typeNine}
        placeholder={placeholderNine}
        onChange={onChangeNine}
        value={valueNine}
      />
      <Input
      type={typeTen}
        placeholder={placeholderTen}
        onChange={onChangeTen}
        value={valueTen}
      />
      {/* <Input
      type={typeEleven}
        placeholder={placeholderEleven}
        onChange={onChangeEleven}
        value={valueEleven}
      /> */}
    </div>
  );
};
