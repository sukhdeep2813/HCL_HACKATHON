import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { useAuthStore } from '../store/useAuthStore'

const AuthPage = ({ mode = 'login' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading } = useAuthStore()

  const redirectTo = location.state?.from ?? '/dashboard/patient'

  const title = useMemo(() => (mode === 'login' ? 'Welcome back' : 'Create your account'), [mode])
  const subtitle = useMemo(
    () =>
      mode === 'login'
        ? 'Access your personalized wellness dashboard and preventive plan.'
        : 'Register as a patient or provider and start collaborating instantly.',
    [mode],
  )

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
      role: mode === 'login' ? data.role ?? 'patient' : data.role,
      name: data.name,
    }
    await login(payload)
    navigate(payload.role === 'provider' ? '/dashboard/provider' : redirectTo, { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {mode === 'register' && (
            <Input
              label="Full Name"
              placeholder="Dr. Maya Fernandez"
              icon={<User className="h-4 w-4" />}
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />
          )}
          <Input
            label="Email"
            type="email"
            placeholder="you@wellness.com"
            icon={<Mail className="h-4 w-4" />}
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
            {...register('password', { required: 'Password is required', minLength: 6 })}
            error={errors.password?.message}
          />
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Role
            <select
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              {...register('role', { required: 'Please select a role' })}
              defaultValue="patient"
            >
              <option value="patient">Patient</option>
              <option value="provider">Provider</option>
            </select>
            {errors.role && <span className="text-xs font-medium text-danger">{errors.role.message}</span>}
          </label>
          <Button type="submit" className="w-full" loading={loading}>
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          {mode === 'login' ? 'New to WellnessHub?' : 'Already have an account?'}{' '}
          <Link to={mode === 'login' ? '/register' : '/login'} className="font-semibold text-primary hover:underline">
            {mode === 'login' ? 'Create an account' : 'Sign in'}
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default AuthPage


