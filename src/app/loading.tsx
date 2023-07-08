import { SkeletonHeader } from '@/components/Skeletons/SkeletonHeader'
import { SkeletonHome } from '@/components/Skeletons/SkeletonHome'
import { SkeletonKnowTechs } from '@/components/Skeletons/SkeletonHome/SkeletonKnowTechs'

export default function Loading() {
  return (
    <div>
      <SkeletonHeader />
      <SkeletonHome />
      <SkeletonKnowTechs />
    </div>
  )
}
