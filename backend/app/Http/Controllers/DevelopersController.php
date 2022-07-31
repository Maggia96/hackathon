<?php

namespace App\Http\Controllers;

use App\Models\Developer;

class DevelopersController extends Controller
{
    public function getTopDevelopers()
    {
        
        $developerModel = new Developer();
        $developers = $developerModel->getTopDevelopers();

        if ($developers) {

            return response()->json([
                'developers' => $developers,
                'success' => true
            ]);
        }
        return response()->json(['success' => false]);
    }

    public function getDeveloperDetailsById($id)
    {
        $developerModel = new Developer();
        $developer = $developerModel->getDeveloperDetailsById($id);

        if ($developer) {

            return response()->json([
                'developer' => $developer,
                'success' => true
            ]);
        }
        return response()->json(['success' => false]);
    }
}
