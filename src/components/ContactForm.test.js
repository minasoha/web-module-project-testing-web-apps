import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);

  const header = screen.getByText(/contact form/i);

  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);

  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, "idd");
  await waitFor(() => {
    const errorMessage = screen.getByText(
      /error: firstName must have at least 5 characters./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    const firstNameError = screen.getByText(
      /error: firstName must have at least 5 characters./i
    );
    expect(firstNameError).toBeInTheDocument();

    const lastNameError = screen.getByText(
      /error: lastName is a required field./i
    );
    expect(lastNameError).toBeInTheDocument();

    const emailError = screen.getByText(
      /error: email must be a valid email address./i
    );
    expect(emailError).toBeInTheDocument();
  });
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, "FirstName");
  const lastName = screen.getByPlaceholderText(/burke/i);
  userEvent.type(lastName, "LastName");
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    const emailError = screen.getByText(
      /error: email must be a valid email address./i
    );
    expect(emailError).toBeInTheDocument();
  });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, "emailemail");

  await waitFor(() => {
    const emailError = screen.getByText(
      /error: email must be a valid email address./i
    );
    expect(emailError).toBeInTheDocument();
  });
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, "FirstName");
  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, "emailemail@email.com");
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    const lastNameError = screen.getByText(
      /error: lastName is a required field./i
    );
    expect(lastNameError).toBeInTheDocument();
  });
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, "asdaa");
  const lastName = screen.getByPlaceholderText(/burke/i);
  userEvent.type(lastName, "asd");
  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, "asd@asd.com");
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    const firstNameSubmited = screen.queryByText("asdaa");
    expect(firstNameSubmited).toBeInTheDocument();
    const lastNameSubmited = screen.queryByText("asd");
    expect(lastNameSubmited).toBeInTheDocument();
    const emailSubmited = screen.queryByText("asd@asd.com");
    expect(emailSubmited).toBeInTheDocument();
    const messageNotSubmited = screen.queryByTestId("messageDisplay");
    expect(messageNotSubmited).not.toBeInTheDocument();
  });
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstName, "asdaa");
  const lastName = screen.getByPlaceholderText(/burke/i);
  userEvent.type(lastName, "asd");
  const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, "asd@asd.com");
  const messageInput = screen.getByLabelText(/message/i);
  userEvent.type(messageInput, "something something");
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    const firstNameSubmited = screen.queryByText("asdaa");
    expect(firstNameSubmited).toBeInTheDocument();
    const lastNameSubmited = screen.queryByText("asd");
    expect(lastNameSubmited).toBeInTheDocument();
    const emailSubmited = screen.queryByText("asd@asd.com");
    expect(emailSubmited).toBeInTheDocument();
    const messageSubmited = screen.queryByTestId("messageDisplay");
    expect(messageSubmited).toBeInTheDocument();
  });
});
