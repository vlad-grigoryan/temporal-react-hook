<div>
    <h1>temporal-react-hook</h1>
    <h6>react-temporal-hooks is a React library that provides hooks for handling date and time operations using the Temporal API.</h6> 
</div>


### Description for Hooks

### ``useTemporal``
<p>The <b>useTemporal</b> hook provides the current date and time using the Temporal API. It automatically updates the date and time every second, ensuring that the component using this hook always displays the most recent time.</p>

#### Features:

- __Real-time Updates:__ The hook updates the current date and time every second.
- __Temporal API Integration:__ Utilizes the Temporal API for precise and reliable date and time handling.
- __Ease of Use:__ Simple to integrate and use in any React component.

#### Example Usage:

```jsx
npm install temporal-react-hook
```

```jsx
import React from 'react';
import { useTemporal } from 'your-package-name';

const App: React.FC = () => {
  const now = useTemporal();

  return (
    <div>
      <h1>Current Date and Time</h1>
      <p>{now.toString()}</p>
    </div>
  );
};

export default App;
```
### Benefits

- __Accuracy__: Temporal API provides nanosecond precision and handles time zones and calendar systems better than the traditional Date object.
- __Simplicity__: The hook abstracts the complexity of handling real-time updates, making it easy to display current date and time in your React application.
- __Immutable__: Temporal objects are immutable, ensuring that each update generates a new instance without modifying the original object.

### Potential Use Cases
- __Clock Display__: Displaying a real-time clock in your application.
- __Time-based Events__: Triggering actions or displaying messages based on the current time.
- __Logging and Monitoring__: Showing timestamps for logs or monitoring data in real-time applications.


### ``useTimeZone``
<p>The <b>useTimeZone</b> hook provides the current time zone and a function to convert a given date-time to a different time zone using the Temporal API.</p>

#### Features:
- __Current Time Zone:__ Provides the current time zone.
- __Time Zone Conversion:__ Converts a given PlainDateTime to a specified time zone.

### Example Usage

```jsx
npm install temporal-react-hook
```

```jsx
import React from 'react';
import { useTemporal, useTimeZone } from 'your-package-name';

const App: React.FC = () => {
    const now = useTemporal();
    const { timeZone, convertToTimeZone } = useTimeZone();

    const newYorkDateTime = convertToTimeZone(now, 'America/New_York');

    return (
        <div>
            <h1>Current Date and Time</h1>
            <p>{now.toString()}</p>
            <h2>Time Zone</h2>
            <p>{timeZone.toString()}</p>
            <h2>New York Time</h2>
            <p>{newYorkDateTime.toString()}</p>
        </div>
    );
};

export default App;
```

### Benefits
- __Current Time Zone Information__  The hook provides easy access to the current time zone of the user's environment, allowing your application to adapt to the user's locale without additional configuration.
- __Time Zone Conversion:__ The hook includes a built-in function to convert any given date-time to a specified target time zone, which simplifies handling global time zones in applications. This is particularly useful for applications that display events or schedules across different time zones.
- __Simplifies Complex Logic:__  By abstracting the complexity of time zone handling, this hook makes it easier for developers to implement and maintain code that involves date-time manipulations across different time zones.
