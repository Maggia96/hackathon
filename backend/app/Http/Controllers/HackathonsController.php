<?php

namespace App\Http\Controllers;

use App\Models\Hackathon;

class HackathonsController extends Controller
{

    public function getHackatons()
    {
        $hackatonModel = new Hackathon();
        $hackatons = $hackatonModel->getHackations();
        return response()->json([
            'hackathons' => $hackatons,
            'success' => true
        ]);
    }

    public function getHackationDetailsById($id)
    {
        $hackatonModel = new Hackathon();
        $hackaton = $hackatonModel->getHackationDetailsById($id);

        if ($hackaton) {

            return response()->json([
                'hackathon' => $hackaton,
                'success' => true
            ]);
        }
        return response()->json(['success' => false]);
    }

}
