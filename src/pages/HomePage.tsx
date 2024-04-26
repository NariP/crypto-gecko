import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import axios from '@/libs/axios';

const HomePage = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await axios.get('/v3/ping');
      const res2 = await axios.get('/bookmark');
      console.log(res, res2);
    })();
  }, []);

  return (
    <div>
      <div className="text-amber-500">Home</div>
      <Switch
        checked={enabled}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
        onChange={setEnabled}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  );
};

export default HomePage;
