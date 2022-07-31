<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hackathon extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'place',
        'date'
    ];

    protected $casts = [
        'date'  => 'date:d-m-Y',
    ];

    public function developments()
    {
        return $this->hasMany(Development::class);
    }

    public function developers()
    {
        return $this->hasMany(Developer::class);
    }

    public function getHackations()
    {
        return Hackathon::paginate(10);
    }
    
    public function getHackationDetailsById($id)
    {
        return $this::with('developments')->with('developers.winner')->find($id);
    }

    public function createHackathonCron($data)
    {
        return Hackathon::create([
            'name' => $data->location->city . ' Hackathon 2022',
            'place' => $data->location->country,
            'date' => date('Y-m-d', strtotime($data->registered->date))
        ]);
    }
}
