import { SkeletonHeader } from '@/components/Skeletons/SkeletonHeader'
import { SkeletonHome } from '@/components/Skeletons/SkeletonHome'

export default function Loading() {
  return (
    <div>
      <SkeletonHeader />
      <SkeletonHome />
    </div>
  )
}
