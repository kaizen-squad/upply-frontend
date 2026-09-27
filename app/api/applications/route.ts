import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { PrestataireSelectedDataSchema } from '@/types';

/**
 * Validates and stores the selected prestataire/application data in an HttpOnly cookie.
 *
 * @param request - Incoming request containing the selected data as JSON.
 * @returns A success response or a 400 response when JSON or schema validation fails.
 */
export async function POST (request: Request) {

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, data: null, message: 'Invalid application data' },
        { status: 400 }
      );
    }

    const application = PrestataireSelectedDataSchema.safeParse(body);
    if (!application.success) {
      return NextResponse.json(
        { success: false, data: null, message: 'Invalid application data' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    
    cookieStore.set('applicationData', JSON.stringify(application.data), {
      httpOnly: true,      
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',     
      maxAge: 7 * 24 * 60 * 60, // 7 jours
      path: '/',           
    });

    return NextResponse.json({success: true, message: 'Application data stored in cookie.'});
}

/**
 * Reads and validates the selected application data from its cookie.
 *
 * @returns The saved selection, or an unsuccessful response if it is absent or invalid.
 */
export async function GET() {
    const cookieStore = await cookies();
    const applicationData = cookieStore.get('applicationData');
    if(applicationData){
        try {
            const application = PrestataireSelectedDataSchema.safeParse(JSON.parse(applicationData.value));
            if (application.success) {
                return NextResponse.json({success: true, data: application.data, message: 'Application data retrieved from cookie'});
            }
        } catch {
            // Invalid cookie contents are handled as missing application data.
        }

        cookieStore.delete('applicationData');
    }
    return NextResponse.json({success: false, data: null, message: 'No application data found in cookie'});
}

/**
 * Deletes the saved application-data cookie.
 *
 * @returns A JSON success response after deleting the cookie.
 */
export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete('applicationData');
    return NextResponse.json({success: true, message: 'Application data deleted.'});
}
