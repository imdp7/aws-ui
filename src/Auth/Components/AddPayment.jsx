import React, { useState, useMemo, useRef } from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Link,
  Input,
  Tiles,
  DatePicker,
  FormField,
  Checkbox,
  Button,
  Modal,
  Box,
  Select,
  Alert,
  ColumnLayout,
} from '@cloudscape-design/components';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router-dom';
import Stripe from 'stripe';

const Content = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [method, setMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [date, setDate] = useState('');
  const [cvc, setCVC] = useState(null);
  const [name, setName] = useState('');
  const [defaultCard, setDefaultCard] = useState(false);
  const [select, setSelect] = React.useState({
    label: 'Use existing address',
    value: '1',
  });
  const [nameCard, setNameCard] = useState('');
  const [company, setCompany] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);
  const [routing, setRouting] = useState(null);
  const [account_type, setAccount_Type] = useState({
    value: 'checking',
    label: 'Checking',
  });
  const [accountNo, setAccountNo] = useState(null);
  const [reAccountNo, setReAccountNo] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const options = useMemo(() => countryList().getData(), []);
  const [visible, setVisible] = useState(false);
  const [confirmationData, setConfirmationData] = useState({});
  const stripe = new Stripe(
    'sk_test_51FrsMEJyECnw5rCL4g5bJkAmDbIWUonjxMQG1h6NDhCaDQ9e29456MxLFFmWRZCf30PZILvtaP0J4FXvHdieWO8e0092YqW109'
  );
  const methodRef = useRef(null);
  const cardNumberRef = useRef(null);
  const dateRef = useRef(null);
  const cvcRef = useRef(null);
  const nameCardRef = useRef(null);
  const RoutingRef = useRef(null);
  const AccountTypeRef = useRef(null);
  const AccountNoRef = useRef(null);
  const ReAccountNoRef = useRef(null);
  const AccountNameRef = useRef(null);

  async function handleSubmit() {
    setLoading(true);
    const timer = setTimeout(async () => {
      if (!method) {
        setErrorMessage('Please select a method to add');
        setLoading(false);
        methodRef.current.focus();
        return;
      }
      if (method === 'card') {
        setErrorMessage('');
        if (!cardNumber) {
          setErrorMessage('Please enter valid card number');
          setLoading(false);
          cardNumberRef.current.focus();
          return;
        }
        if (!date) {
          setErrorMessage('Please enter the expiration date');
          setLoading(false);
          dateRef.current.focus();
          return;
        }
        if (!cvc) {
          setErrorMessage('Please enter the 3 digit security code');
          setLoading(false);
          cvcRef.current.focus();
          return;
        }
        if (!nameCard) {
          setErrorMessage('Please enter the name on the card');
          setLoading(false);
          nameCardRef.current.focus();
          return;
        }
        setErrorMessage('');
        setError(false);
        const paymentMethod = await stripe.paymentMethods.create({
          type: method,
          card: {
            number: cardNumber,
            exp_month: '12',
            exp_year: '24',
            cvc: cvc,
          },
          billing_details: {
            address: {
              city: city,
              country: country?.value,
              line1: address1,
              line2: address2,
              postal_code: zipCode,
              state: state,
            },
            email: email,
            name: name,
            phone: phone,
          },
        });
        if (paymentMethod.error) {
          setErrorMessage(paymentMethod.error.message);
        } else {
          setVisible(true);
          const confirmationData = Object.entries(paymentMethod.card).reduce(
            (obj, [key, value]) => ({ ...obj, [key]: value }),
            {}
          );
          setConfirmationData(confirmationData);
          console.log(confirmationData);
        }
      }
      if (method === 'bank') {
        setErrorMessage('');
        if (!account_type) {
          setErrorMessage('Please select the bank account type');
          setLoading(false);
          AccountTypeRef.current.focus();
          return;
        }
        if (!routing) {
          setErrorMessage('Please enter the bank routing number');
          setLoading(false);
          RoutingRef.current.focus();
          return;
        }
        if (!accountNo) {
          setErrorMessage('Please enter the bank account number');
          setLoading(false);
          AccountNoRef.current.focus();
          return;
        }
        if (!reAccountNo) {
          setErrorMessage('Please re-enter the bank account number');
          setLoading(false);
          ReAccountNoRef.current.focus();
          return;
        }
        if (!accountName) {
          setErrorMessage('Please re-enter the bank account name');
          setLoading(false);
          AccountNameRef.current.focus();
          return;
        }
        setErrorMessage('');
        setLoading(false);
        const bankAccount = await stripe.paymentMethods.create({
          type: 'us_bank_account',
          us_bank_account: {
            account_holder_type: 'individual',
            account_number: accountNo,
            account_type: account_type?.value,
            routing_number: routing,
          },
          billing_details: {
            address: {
              city: city,
              country: country?.value,
              line1: address1,
              line2: address2,
              postal_code: zipCode,
              state: state,
            },
            email: email,
            name: name,
            phone: phone,
          },
        });
        if (bankAccount.error) {
          setErrorMessage(bankAccount.error.message);
        } else {
          setVisible(true);
          const confirmationData = Object.entries(bankAccount).reduce(
            (obj, [key, value]) => ({ ...obj, [key]: value }),
            {}
          );
          setConfirmationData(confirmationData);
          console.log(confirmationData);
        }
      }
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }

  const capital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <SpaceBetween size="m">
      <Modal
        onDismiss={() => setVisible(false)}
        visible={visible}
        closeAriaLabel="Close modal"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary" onClick={() => navigate(-1)}>
                Back to Payment preferences
              </Button>
            </SpaceBetween>
          </Box>
        }
        header={
          capital(`${confirmationData.funding || confirmationData.type}`) +
          ' ' +
          'card added successfully'
        }
      >
        <ColumnLayout columns={2}>
          <FormField label="Card Type">
            <Box>{capital(`${confirmationData.brand}`)}</Box>
          </FormField>
          <FormField label="Last 4 digits">
            <Box>
              {capital(
                `${
                  confirmationData?.last4 ||
                  confirmationData?.us_bank_account?.last4
                }`
              )}
            </Box>
          </FormField>
          <FormField label="Confirmation Number">
            <Box>{confirmationData.fingerprint}</Box>
          </FormField>
        </ColumnLayout>
      </Modal>
      <Container
        header={
          <Header variant="h3" info={<Link>Info</Link>}>
            Choose a payment method type
          </Header>
        }
      >
        <SpaceBetween size="m">
          <Tiles
            ref={methodRef}
            onChange={({ detail }) => setMethod(detail.value)}
            value={method}
            columns={2}
            items={[
              {
                label: 'Credit or debit card',
                value: 'card',
                description: 'All major credit and debit cards are accepted.',
              },
              {
                label: 'Bank account (ACH)',
                value: 'bank',
                description:
                  'Major bank account can be linked for recurring payments',
              },
            ]}
          />
        </SpaceBetween>
      </Container>
      {method == 'card' && (
        <>
          <Container
            header={
              <Header variant="h3" fitHeight>
                Card Information
              </Header>
            }
          >
            <SpaceBetween size="m">
              <FormField
                label="Card number"
                errorText={
                  errorMessage &&
                  errorMessage.includes('card number') &&
                  errorMessage
                }
              >
                <Input
                  ref={cardNumberRef}
                  step={1}
                  className="input-width-card"
                  value={cardNumber}
                  type="number"
                  onChange={({ detail }) => {
                    detail.value.length <= 16
                      ? setCardNumber(detail.value)
                      : setError(false);
                  }}
                />
              </FormField>
              <FormField
                label="Expiry date"
                errorText={
                  errorMessage &&
                  errorMessage.includes('expiration date') &&
                  errorMessage
                }
              >
                <DatePicker
                  ref={dateRef}
                  step={2}
                  onChange={({ detail }) => {
                    setDate(detail.value);
                  }}
                  value={date}
                  openCalendarAriaLabel={(selectedDate) =>
                    'Choose certificate expiry date' +
                    (selectedDate ? `, selected date is ${selectedDate}` : '')
                  }
                  nextMonthAriaLabel="Next month"
                  placeholder="YYYY/MM/DD"
                  previousMonthAriaLabel="Previous month"
                  todayAriaLabel="Today"
                />
              </FormField>
              <FormField
                label="CVC"
                errorText={
                  errorMessage &&
                  errorMessage.includes('security code') &&
                  errorMessage
                }
              >
                <Input
                  step={3}
                  ref={cvcRef}
                  className="input-width-number"
                  value={cvc}
                  inputMode="numeric"
                  type="number"
                  onChange={({ detail }) => {
                    detail.value.length <= 4
                      ? setCVC(detail.value)
                      : setError(true);
                  }}
                />
              </FormField>
              <FormField
                label="Name on card"
                errorText={
                  errorMessage &&
                  errorMessage.includes('name on the card') &&
                  errorMessage
                }
              >
                <Input
                  className="input-width-name"
                  step={4}
                  ref={nameCardRef}
                  value={nameCard}
                  onChange={({ detail }) => {
                    detail.value !== 0 && setNameCard(detail.value);
                  }}
                />
              </FormField>
              <Checkbox
                checked={defaultCard}
                onChange={({ detail }) => setDefaultCard(detail.checked)}
              >
                Set as default payment method
              </Checkbox>
            </SpaceBetween>
          </Container>

          <Container
            header={
              <Header
                variant="h3"
                actions={
                  <Select
                    selectedOption={select}
                    onChange={({ detail }) => setSelect(detail.selectedOption)}
                    options={[
                      { label: 'Use Existing address', value: '1' },
                      { label: 'Contact address', value: '2' },
                    ]}
                    selectedAriaLabel="Selected"
                  />
                }
              >
                Billing information
              </Header>
            }
          >
            <SpaceBetween size="m">
              <FormField label="Full name">
                <Input
                  className="input-width-card"
                  value={name}
                  step={5}
                  onChange={({ detail }) => setName(detail.value)}
                />
              </FormField>
              <FormField label="Company - optional">
                <Input
                  className="input-width-card"
                  value={company}
                  step={6}
                  onChange={({ detail }) => setCompany(detail.value)}
                />
              </FormField>
              <FormField label="Select Country">
                <Select
                  className="input-width-card"
                  options={options}
                  step={7}
                  errorText="Error fetching countries."
                  placeholder="Choose a country"
                  recoveryText="Retry"
                  filteringType="auto"
                  selectedAriaLabel="Selected"
                  triggerVariant="option"
                  selectedOption={country}
                  onChange={({ detail }) => setCountry(detail.selectedOption)}
                />
              </FormField>
              <FormField label="Address">
                <SpaceBetween size="xs">
                  <Input
                    className="input-width-card"
                    value={address1}
                    step={8}
                    onChange={({ detail }) => setAddress1(detail.value)}
                  />
                  <Input
                    className="input-width-card"
                    value={address2}
                    step={9}
                    placeholder="Apartment, suite, unit floor, etc."
                    onChange={({ detail }) => setAddress2(detail.value)}
                  />
                </SpaceBetween>
              </FormField>
              <SpaceBetween size="m" direction="horizontal">
                <FormField label="City">
                  <Input
                    value={city}
                    step={10}
                    onChange={({ detail }) => setCity(detail.value)}
                  />
                </FormField>
                <FormField label="State/province/region">
                  <Input
                    value={state}
                    step={11}
                    onChange={({ detail }) => setState(detail.value)}
                  />
                </FormField>
              </SpaceBetween>
              <FormField label="Zip code/postal code">
                <Input
                  className="input-width-card"
                  value={zipCode}
                  step={12}
                  onChange={({ detail }) => setZipCode(detail.value)}
                />
              </FormField>
              <FormField label="Phone number">
                <Input
                  className="input-width-card"
                  value={phone}
                  step={13}
                  placeholder="+1 222-333-4444"
                  inputMode="tel"
                  onChange={({ detail }) => setPhone(detail.value)}
                />
              </FormField>
              <FormField label="Billing contact email - optional">
                <Input
                  className="input-width-card"
                  value={email}
                  step={14}
                  inputMode="email"
                  onChange={({ detail }) => setEmail(detail.value)}
                />
              </FormField>
            </SpaceBetween>
          </Container>
          {errorMessage && <Alert type="error">{errorMessage}</Alert>}
          <SpaceBetween size="l" direction="horizontal" className="btn-right">
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit} loading={loading}>
              Add card
            </Button>
          </SpaceBetween>
        </>
      )}
      {method === 'bank' && (
        <SpaceBetween size="m">
          <Container
            header={
              <Header variant="h3" fitHeight>
                Bank Details
              </Header>
            }
          >
            <SpaceBetween size="m">
              <FormField
                label="Account type"
                errorText={
                  errorMessage &&
                  errorMessage.includes('account type') &&
                  errorMessage
                }
              >
                <Select
                  selectedOption={account_type}
                  ref={AccountTypeRef}
                  onChange={({ detail }) =>
                    setAccount_Type(detail.selectedOption)
                  }
                  options={[
                    {
                      value: 'checking',
                      label: 'Checking',
                    },
                    {
                      value: 'savings',
                      label: 'Savings',
                    },
                  ]}
                />
              </FormField>
              <FormField
                label="Routing number"
                errorText={
                  errorMessage &&
                  errorMessage.includes('routing number') &&
                  errorMessage
                }
              >
                <Input
                  value={routing}
                  ref={RoutingRef}
                  onChange={({ detail }) => setRouting(detail.value)}
                  placeholder="000000000"
                />
              </FormField>
              <FormField
                label="Account number"
                errorText={
                  errorMessage &&
                  errorMessage.includes('account number') &&
                  errorMessage
                }
              >
                <Input
                  value={accountNo}
                  ref={AccountNoRef}
                  onChange={({ detail }) => setAccountNo(detail.value)}
                  placeholder="000000000"
                />
              </FormField>
              <FormField
                label="Re-enter Account number"
                errorText={
                  errorMessage &&
                  errorMessage.includes('re-enter the bank account number') &&
                  errorMessage
                }
              >
                <Input
                  value={reAccountNo}
                  ref={ReAccountNoRef}
                  onChange={({ detail }) => setReAccountNo(detail.value)}
                  placeholder="000000000"
                />
              </FormField>
              <FormField
                label="Account holder name"
                errorText={
                  errorMessage &&
                  errorMessage.includes('bank account name') &&
                  errorMessage
                }
              >
                <Input
                  value={accountName}
                  ref={AccountNameRef}
                  onChange={({ detail }) => setAccountName(detail.value)}
                  placeholder="Andy Jassy"
                />
              </FormField>
            </SpaceBetween>
          </Container>
          <Container
            header={
              <Header
                variant="h3"
                actions={
                  <Select
                    selectedOption={select}
                    onChange={({ detail }) => setSelect(detail.selectedOption)}
                    options={[
                      { label: 'Use Existing address', value: '1' },
                      { label: 'Contact address', value: '2' },
                    ]}
                    selectedAriaLabel="Selected"
                  />
                }
              >
                Billing information
              </Header>
            }
          >
            <SpaceBetween size="m">
              <FormField label="Full name">
                <Input
                  className="input-width-card"
                  value={name}
                  step={5}
                  onChange={({ detail }) => setName(detail.value)}
                />
              </FormField>
              <FormField label="Company - optional">
                <Input
                  className="input-width-card"
                  value={company}
                  step={6}
                  onChange={({ detail }) => setCompany(detail.value)}
                />
              </FormField>
              <FormField label="Select Country">
                <Select
                  className="input-width-card"
                  options={options}
                  step={7}
                  errorText="Error fetching countries."
                  placeholder="Choose a country"
                  recoveryText="Retry"
                  filteringType="auto"
                  selectedAriaLabel="Selected"
                  triggerVariant="option"
                  selectedOption={country}
                  onChange={({ detail }) => setCountry(detail.selectedOption)}
                />
              </FormField>
              <FormField label="Address">
                <SpaceBetween size="xs">
                  <Input
                    className="input-width-card"
                    value={address1}
                    step={8}
                    onChange={({ detail }) => setAddress1(detail.value)}
                  />
                  <Input
                    className="input-width-card"
                    value={address2}
                    step={9}
                    placeholder="Apartment, suite, unit floor, etc."
                    onChange={({ detail }) => setAddress2(detail.value)}
                  />
                </SpaceBetween>
              </FormField>
              <SpaceBetween size="m" direction="horizontal">
                <FormField label="City">
                  <Input
                    value={city}
                    step={10}
                    onChange={({ detail }) => setCity(detail.value)}
                  />
                </FormField>
                <FormField label="State/province/region">
                  <Input
                    value={state}
                    step={11}
                    onChange={({ detail }) => setState(detail.value)}
                  />
                </FormField>
              </SpaceBetween>
              <FormField label="Zip code/postal code">
                <Input
                  className="input-width-card"
                  value={zipCode}
                  step={12}
                  onChange={({ detail }) => setZipCode(detail.value)}
                />
              </FormField>
              <FormField label="Phone number">
                <Input
                  className="input-width-card"
                  value={phone}
                  step={13}
                  placeholder="+1 222-333-4444"
                  inputMode="tel"
                  onChange={({ detail }) => setPhone(detail.value)}
                />
              </FormField>
              <FormField label="Billing contact email - optional">
                <Input
                  className="input-width-card"
                  value={email}
                  step={14}
                  inputMode="email"
                  onChange={({ detail }) => setEmail(detail.value)}
                />
              </FormField>
            </SpaceBetween>
          </Container>
          {errorMessage && <Alert type="error">{errorMessage}</Alert>}
          <SpaceBetween size="l" direction="horizontal" className="btn-right">
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit} loading={loading}>
              Add Bank
            </Button>
          </SpaceBetween>
        </SpaceBetween>
      )}
    </SpaceBetween>
  );
};
function AddPayment() {
  return <Content />;
}

export default AddPayment;
