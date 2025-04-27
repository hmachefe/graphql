import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type GameFormInputs = {
  title: string;
  platform: string;
};

interface GameFormProps {
  onAdd: (data: GameFormInputs) => void;
}

export default function GameForm({ onAdd }: GameFormProps) {
  const { register, handleSubmit, reset } = useForm<GameFormInputs>();
  const { t } = useTranslation();

  const onSubmit = (data: GameFormInputs) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 max-w-md">
      <div>
        <label className="block font-medium text-sm">{t('title')}</label>
        <input
          {...register('title', { required: true })}
          className="w-full p-2 border rounded"
          placeholder={t('enterTitle')}
        />
      </div>
      <div>
        <label className="block font-medium text-sm">{t('platforms')}</label>
        <input
          {...register('platform', { required: true })}
          className="w-full p-2 border rounded"
          placeholder={t('enterPlatforms')}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {t('addGame')}
      </button>
    </form>
  );
}
