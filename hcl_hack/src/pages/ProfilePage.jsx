import { useForm } from 'react-hook-form'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useAuthStore } from '../store/useAuthStore'

const ProfilePage = () => {
  const { user, updateProfile } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      age: user?.age ?? '',
      allergies: user?.allergies?.join(', ') ?? '',
      medications: user?.medications?.join(', ') ?? '',
    },
  })

  const onSubmit = (data) => {
    updateProfile({
      name: data.name,
      age: data.age,
      allergies: data.allergies.split(',').map((item) => item.trim()),
      medications: data.medications.split(',').map((item) => item.trim()),
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
          <p className="text-sm text-slate-600">Manage your personal information and consent preferences.</p>
        </div>
        <Card>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Name" {...register('name', { required: 'Name is required' })} error={errors.name?.message} />
            <Input
              label="Email"
              type="email"
              disabled
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
            />
            <Input label="Age" type="number" {...register('age')} />
            <Input
              label="Allergies"
              placeholder="Peanuts, Penicillin"
              {...register('allergies')}
            />
            <Input
              label="Medications"
              placeholder="Metformin, Vitamin D"
              {...register('medications')}
            />
            <Button type="submit">Save changes</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage


