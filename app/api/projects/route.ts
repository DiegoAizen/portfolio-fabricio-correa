import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, createProject, getFeaturedProjects } from '@/lib/firebase/firestore';
import type { NewProject } from '@/types';

// GET /api/projects - Obtener todos los proyectos o solo los destacados
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');

    const projects = featured === 'true'
      ? await getFeaturedProjects()
      : await getAllProjects();

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Error al obtener proyectos' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Crear un nuevo proyecto
export async function POST(request: NextRequest) {
  try {
    const body: NewProject = await request.json();

    // Validación básica
    if (!body.title || !body.description || !body.technologies || !body.imageUrl) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const projectId = await createProject(body);

    return NextResponse.json(
      { id: projectId, message: 'Proyecto creado exitosamente' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Error al crear proyecto' },
      { status: 500 }
    );
  }
}
