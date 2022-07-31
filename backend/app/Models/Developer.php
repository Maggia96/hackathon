<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_name',
        'gender',
        'city',
        'phone',
        'picture',
        'hackathon_id',
        'development_id',
        'user_id'
    ];

    public function development()
    {
        return $this->hasOne(Development::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function hackathon()
    {
        return $this->belongsTo(Hackathon::class);
    }

    public function winner()
    {
        return $this->hasOne(winner::class);
    }

    public function getTopDevelopers()
    {
        return Winner::where('ranking', '!=', 'null')->with('developer', 'developer.hackathon')->orderBy('ranking', 'asc')->paginate(7);
    }

    public function createDeveloperCron($data, $hackathonId, $userId, $developmentId)
    {
        return Developer::create([
            'user_name' => $data->login->username,
            'gender' => $data->gender,
            'city' => $data->location->city,
            'phone' => $data->phone,
            'picture' => $data->picture->medium,
            'hackathon_id' => $hackathonId,
            'development_id' => $developmentId,
            'user_id' => $userId
        ]);
    }
}
