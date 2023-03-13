import React, { useState, useMemo } from 'react';
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
  Select,
  Alert,
} from '@cloudscape-design/components';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router-dom';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51FrsMEJyECnw5rCL4g5bJkAmDbIWUonjxMQG1h6NDhCaDQ9e29456MxLFFmWRZCf30PZILvtaP0J4FXvHdieWO8e0092YqW109'
);

async function handleSubmit(event) {
  event.preventDefault();
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2023,
      cvc: '314',
    },
    billing_details: {
      address: {
        city: 'New York',
        country: 'US',
        line1: '00 abc street',
        line2: '',
        postal_code: '08820',
        state: 'New york',
      },
      email: 'abc@abc.com',
      name: 'Darshan Patel',
      phone: '+1 848-235-8321',
    },
  });
  if (paymentMethod.error) {
    console.log(error);
  } else {
    console.log(paymentMethod);
  }
}

const Content = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState([
    {
      label: 'Credit or debit card',
      value: 'card',
      description: 'All major credit and debit cards are accepted.',
    },
  ]);
  const [cardNumber, setCardNumber] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [cvc, setCVC] = useState(null);
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
  const options = useMemo(() => countryList().getData(), []);

  const stripe = new Stripe(
    'sk_test_51FrsMEJyECnw5rCL4g5bJkAmDbIWUonjxMQG1h6NDhCaDQ9e29456MxLFFmWRZCf30PZILvtaP0J4FXvHdieWO8e0092YqW109'
  );

  async function handleSubmit(event) {
    event.preventDefault();
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
      console.log(error);
    } else {
      window.addEventListener('successful added', (event) => {
        console.log(`Received message: ${paymentMethod}`);
      });
    }
  }

  return (
    <SpaceBetween size="m">
      <Container
        header={
          <Header variant="h3" info={<Link>Info</Link>}>
            Choose a payment method type
          </Header>
        }
      >
        <Tiles
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
              disabled: true,
              description: `You don't qualify for this payment method. Accounts with at least one fully paid monthly invoice with USD payment currencies can add bank account as a payment method. You can change your payment currency to USD on the Account page.`,
            },
          ]}
        />
      </Container>
      <Container header={<Header variant="h3">Card Information</Header>}>
        <SpaceBetween size="m">
          <FormField label="Card number">
            <Input
              step={1}
              className="input-width-card"
              value={cardNumber}
              onChange={({ detail }) => setCardNumber(detail.value)}
            />
          </FormField>
          <FormField label="Expiry date">
            <DatePicker
              step={2}
              onChange={({ detail }) => setDate(detail.value)}
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
          <FormField label="CVC">
            <Input
              step={1}
              className="input-width-number"
              value={cvc}
              inputMode="numeric"
              type="number"
              onChange={({ detail }) => setCVC(detail.value)}
            />
          </FormField>
          <FormField label="Name on card">
            <Input
              className="input-width-name"
              step={3}
              value={nameCard}
              onChange={({ detail }) => setNameCard(detail.value)}
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
              onChange={({ detail }) => setName(detail.value)}
            />
          </FormField>
          <FormField label="Company - optional">
            <Input
              className="input-width-card"
              value={company}
              onChange={({ detail }) => setCompany(detail.value)}
            />
          </FormField>
          <FormField label="Select Country">
            <Select
              className="input-width-card"
              options={options}
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
                onChange={({ detail }) => setAddress1(detail.value)}
              />
              <Input
                className="input-width-card"
                value={address2}
                placeholder="Apartment, suite, unit floor, etc."
                onChange={({ detail }) => setAddress2(detail.value)}
              />
            </SpaceBetween>
          </FormField>
          <SpaceBetween size="m" direction="horizontal">
            <FormField label="City">
              <Input
                value={city}
                onChange={({ detail }) => setCity(detail.value)}
              />
            </FormField>
            <FormField label="State/province/region">
              <Input
                value={state}
                onChange={({ detail }) => setState(detail.value)}
              />
            </FormField>
          </SpaceBetween>
          <FormField label="Zip code/postal code">
            <Input
              className="input-width-card"
              value={zipCode}
              onChange={({ detail }) => setZipCode(detail.value)}
            />
          </FormField>
          <FormField label="Phone number">
            <Input
              className="input-width-card"
              value={phone}
              placeholder="+1 222-333-4444"
              inputMode="tel"
              onChange={({ detail }) => setPhone(detail.value)}
            />
          </FormField>
          <FormField label="Billing contact email - optional">
            <Input
              className="input-width-card"
              value={email}
              inputMode="email"
              onChange={({ detail }) => setEmail(detail.value)}
            />
          </FormField>
        </SpaceBetween>
      </Container>
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit} loading={loading}>
          Add card
        </Button>
      </SpaceBetween>
    </SpaceBetween>
  );
};
function AddPayment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 1500);
  };
  return (
    // <SpaceBetween size="m">
    //   <MethodType />
    //   <CardInformation />
    //   <BillingInformation />
    //   <SpaceBetween size="l" direction="horizontal" className="btn-right">
    //     <Button onClick={() => navigate(-1)}>Cancel</Button>
    //     <Button variant="primary" onClick={handleSubmit} loading={loading}>
    //       Add card
    //     </Button>
    //   </SpaceBetween>
    // </SpaceBetween>
    <Content />
  );
}

export default AddPayment;
