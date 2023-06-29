'use client'

import { SectionTitle } from '../SectionTitle'
import { Button } from '../Button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUpAnimation } from '@/lib/animations'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormData) {
    try {
      await axios.post('/api/contact', data)
      toast.success('Mensagem enviada com sucesso!')
      reset()
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente.')
    }
  }

  return (
    <section
      id="contact"
      className="flex items-center justify-center bg-gray-50 px-6 py-16 dark:bg-gray-950 md:py-32"
    >
      <div className="mx-auto w-full max-w-[420px] pb-10">
        <SectionTitle
          subtitle="contato"
          title="Vamos trabalhar juntos? Entre em contato"
          className="items-center text-center"
        />
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col gap-4"
          {...fadeUpAnimation}
        >
          <input
            type="text"
            placeholder="Nome"
            className="h-14 w-full rounded-lg bg-gray-300 p-4 font-sans text-gray-950 ring-emerald-400 placeholder:text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-gray-50 dark:ring-emerald-600 dark:placeholder:text-gray-400"
            {...register('name')}
          />
          <input
            type="email"
            placeholder="Email"
            className="h-14 w-full rounded-lg bg-gray-300 p-4 font-sans text-gray-950 ring-emerald-400 placeholder:text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-gray-50 dark:ring-emerald-600 dark:placeholder:text-gray-400"
            {...register('email')}
          />
          <input
            type="textarea"
            placeholder="Mensagem"
            className="h-[138px] w-full resize-none rounded-lg bg-gray-300 p-4 font-sans text-gray-950 ring-emerald-300 placeholder:text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-gray-50 dark:ring-emerald-600 dark:placeholder:text-gray-400"
            maxLength={500}
            {...register('message')}
          />
          <Button
            className="m-max mx-auto mt-6 shadow-button"
            disabled={isSubmitting}
          >
            Enviar mensagem
            <ArrowRight size={18} />
          </Button>
        </motion.form>
      </div>
    </section>
  )
}
