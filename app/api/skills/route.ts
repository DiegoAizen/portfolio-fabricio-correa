import { NextRequest, NextResponse } from 'next/server';
import { getAllSkills, createSkill, getSkillsByCategory } from '@/lib/firebase/firestore';
import type { NewSkill } from '@/types';

// GET /api/skills - Obtener todas las habilidades o por categoría
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    const skills = category
      ? await getSkillsByCategory(category)
      : await getAllSkills();

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Error al obtener habilidades' },
      { status: 500 }
    );
  }
}

// POST /api/skills - Crear una nueva habilidad
export async function POST(request: NextRequest) {
  try {
    const body: NewSkill = await request.json();

    // Validación básica
    if (!body.name || !body.category || body.level === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar nivel (debe estar entre 1 y 5)
    if (body.level < 1 || body.level > 5) {
      return NextResponse.json(
        { error: 'El nivel debe estar entre 1 y 5' },
        { status: 400 }
      );
    }

    const skillId = await createSkill(body);

    return NextResponse.json(
      { id: skillId, message: 'Habilidad creada exitosamente' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Error al crear habilidad' },
      { status: 500 }
    );
  }
}
