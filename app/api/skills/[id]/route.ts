import { NextRequest, NextResponse } from 'next/server';
import { updateSkill, deleteSkill } from '@/lib/firebase/firestore';
import type { UpdateSkill } from '@/types';

// PUT /api/skills/[id] - Actualizar una habilidad
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateSkill = await request.json();

    // Validar nivel si se proporciona
    if (body.level !== undefined && (body.level < 1 || body.level > 5)) {
      return NextResponse.json(
        { error: 'El nivel debe estar entre 1 y 5' },
        { status: 400 }
      );
    }

    await updateSkill(params.id, body);

    return NextResponse.json({ message: 'Habilidad actualizada exitosamente' });
  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      { error: 'Error al actualizar habilidad' },
      { status: 500 }
    );
  }
}

// DELETE /api/skills/[id] - Eliminar una habilidad
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteSkill(params.id);

    return NextResponse.json({ message: 'Habilidad eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { error: 'Error al eliminar habilidad' },
      { status: 500 }
    );
  }
}
